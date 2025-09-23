// 시간을 좌표로 변환
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
    deg: angle * (180 / Math.PI) + 90,
  };
};
