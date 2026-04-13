interface GoldPriceResponse {
  price_per_oz: number;
  price_per_gram: number;
  currency: string;
  timestamp: number;
}

interface CachedPrice {
  data: GoldPriceResponse;
  fetchedAt: number;
}

let cache: CachedPrice | null = null;
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

async function fetchGoldPrice(): Promise<GoldPriceResponse> {
  const apiKey = process.env.GOLDAPI_KEY;

  if (!apiKey) {
    return {
      price_per_oz: 3400,
      price_per_gram: 109.3,
      currency: 'USD',
      timestamp: Date.now(),
    };
  }

  const res = await fetch('https://www.goldapi.io/api/XAU/USD', {
    headers: { 'x-access-token': apiKey },
  });

  if (!res.ok) {
    throw new Error(`GoldAPI error: ${res.status}`);
  }

  const data = await res.json();

  return {
    price_per_oz: data.price,
    price_per_gram: data.price_gram,
    currency: 'USD',
    timestamp: Date.now(),
  };
}

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate=60');

  try {
    const now = Date.now();

    if (cache && (now - cache.fetchedAt) < CACHE_TTL_MS) {
      return res.status(200).json(cache.data);
    }

    const freshData = await fetchGoldPrice();
    cache = { data: freshData, fetchedAt: now };

    return res.status(200).json(freshData);
  } catch (error) {
    if (cache) {
      return res.status(200).json(cache.data);
    }

    return res.status(200).json({
      price_per_oz: 3400,
      price_per_gram: 109.3,
      currency: 'USD',
      timestamp: Date.now(),
    });
  }
}
