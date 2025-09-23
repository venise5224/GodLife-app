export const polarToCartesian = (
  cx: number,
  cy: number,
  minutes: number,
  r: number
) => {
  const angle = (minutes / (24 * 60)) * 2 * Math.PI - Math.PI / 2;
  return {
    x: cx + r * Math.cos(angle),
    y: cy + r * Math.sin(angle),
  };
};
