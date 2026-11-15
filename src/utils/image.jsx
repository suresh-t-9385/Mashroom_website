/**
 * Replace these with your real CDN images (WebP/AVIF).
 * picsum.photos is used so the template renders without missing assets.
 */
export const img = (seed, w = 800, h = 600) =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;
