import type { APIRoute } from 'astro';

// Simple server-side cache (15 minutes)
let cache: { data: GoldPriceResponse; expiresAt: number } | null = null;
const CACHE_TTL = 15 * 60 * 1000; // 15 minutes

interface GoldPriceResponse {
  price_per_oz: number;
  price_per_gram: number;
  currency: string;
  timestamp: number;
}

// Troy ounce to gram conversion
const OZ_TO_GRAM = 31.1035;

export const GET: APIRoute = async () => {
  // Serve from cache if still fresh
  if (cache && Date.now() < cache.expiresAt) {
    return new Response(JSON.stringify(cache.data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const apiKey = import.meta.env.GOLDAPI_KEY;

  if (!apiKey) {
    // No API key — return fallback price
    const fallback: GoldPriceResponse = {
      price_per_oz: 3400,
      price_per_gram: parseFloat((3400 / OZ_TO_GRAM).toFixed(4)),
      currency: 'USD',
      timestamp: Date.now(),
    };
    return new Response(JSON.stringify(fallback), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const res = await fetch('https://www.goldapi.io/api/XAU/USD', {
      headers: {
        'x-access-token': apiKey,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw new Error(`GoldAPI error: ${res.status}`);

    const raw = await res.json();
    const pricePerOz: number = raw.price ?? 3400;

    const data: GoldPriceResponse = {
      price_per_oz: pricePerOz,
      price_per_gram: parseFloat((pricePerOz / OZ_TO_GRAM).toFixed(4)),
      currency: 'USD',
      timestamp: Date.now(),
    };

    cache = { data, expiresAt: Date.now() + CACHE_TTL };

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    // On error return cached stale data if available, otherwise fallback
    if (cache) {
      return new Response(JSON.stringify(cache.data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const fallback: GoldPriceResponse = {
      price_per_oz: 3400,
      price_per_gram: parseFloat((3400 / OZ_TO_GRAM).toFixed(4)),
      currency: 'USD',
      timestamp: Date.now(),
    };

    return new Response(JSON.stringify(fallback), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
