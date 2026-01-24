// app/rooms/starleaf/_battle/utils.js

export const DIRS_4 = [
  { x: 1, y: 0 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: -1 },
];

export function keyOf(pos) {
  return `${pos.x},${pos.y}`;
}

export function parseKey(k) {
  const [x, y] = k.split(",").map((n) => Number(n));
  return { x, y };
}

export function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}

// Deterministic RNG (Mulberry32)
export function seededRand(seed) {
  let t = seed >>> 0;
  return function rand() {
    t += 0x6D2B79F5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

export function pick(rng, arr) {
  return arr[Math.floor(rng() * arr.length)];
}

export function pickEmptySpawn({ W, H, occ, rng }) {
  for (let i = 0; i < 2000; i++) {
    const x = Math.floor(rng() * W);
    const y = Math.floor(rng() * H);
    const k = `${x},${y}`;
    if (!occ.has(k)) return { x, y };
  }
  // fallback
  return { x: 0, y: 0 };
}
