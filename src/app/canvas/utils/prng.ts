export function createPRNG(seed: number) {
  let s = seed;
  return function rand() {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}
