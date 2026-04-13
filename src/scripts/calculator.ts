const KARAT_PURITY: Record<string, number> = {
  '10': 0.4167,
  '14': 0.5833,
  '18': 0.75,
  '24': 1.0,
};

interface GoldPrice {
  price_per_oz: number;
  price_per_gram: number;
  currency: string;
  timestamp: number;
}

let cachedPrice: GoldPrice | null = null;

async function fetchGoldPrice(): Promise<GoldPrice> {
  if (cachedPrice) return cachedPrice;
  try {
    const res = await fetch('/api/gold-price');
    if (!res.ok) throw new Error('API error');
    cachedPrice = await res.json();
    return cachedPrice!;
  } catch {
    return { price_per_oz: 3400, price_per_gram: 109.3, currency: 'USD', timestamp: Date.now() };
  }
}

function calculateValue(weightGrams: number, karats: string, pricePerGram: number): number {
  const purity = KARAT_PURITY[karats] ?? 0;
  return weightGrams * pricePerGram * purity;
}

export function initCalculator() {
  const weightInput = document.getElementById('calc-weight') as HTMLInputElement;
  const karatButtons = document.querySelectorAll('[data-karat]');
  const priceDisplay = document.getElementById('calc-spot-price');
  const resultDisplay = document.getElementById('calc-result');
  const resultWrapper = document.getElementById('calc-result-wrapper');

  if (!weightInput || !resultDisplay) return;

  let selectedKarat = '14';

  fetchGoldPrice().then(price => {
    if (priceDisplay) {
      priceDisplay.textContent = '$' + price.price_per_oz.toLocaleString('en-US', { maximumFractionDigits: 0 });
    }
  });

  karatButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      karatButtons.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      selectedKarat = (btn as HTMLElement).dataset.karat!;
      updateResult();
    });
  });

  weightInput.addEventListener('input', updateResult);

  async function updateResult() {
    const weight = parseFloat(weightInput.value);
    if (!weight || weight <= 0) {
      if (resultWrapper) resultWrapper.style.display = 'none';
      return;
    }
    const price = await fetchGoldPrice();
    const value = calculateValue(weight, selectedKarat, price.price_per_gram);
    resultDisplay!.textContent = '$' + value.toLocaleString('en-US', { maximumFractionDigits: 0 });
    if (resultWrapper) resultWrapper.style.display = 'block';
  }
}
