export const randomRGB = (): number[] => {
  const num = Math.round(0xffffff * Math.random());
  const r = num >> 16;
  const g = num >> 8 & 255;
  const b = num & 255;

  return [r, g, b]
}
