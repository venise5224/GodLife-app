// 분(시간)을 원 위 좌표로 변환
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

// 원 위 부채꼴 경로 생성
export function describeArc(
  cx: number,
  cy: number,
  start: number,
  end: number,
  radius: number
) {
  const startCoord = polarToCartesian(cx, cy, start, radius);
  const endCoord = polarToCartesian(cx, cy, end, radius);
  // 각도 차이를 0~1440분 범위로 보정
  const diff = (end - start + 1440) % 1440;

  // 12시간(720분, 180도) 초과면 largeArc 설정
  const largeArc = diff > 720 ? 1 : 0;

  return [
    `M ${cx},${cy}`,
    `L ${startCoord.x},${startCoord.y}`,
    `A ${radius},${radius} 0 ${largeArc},1 ${endCoord.x},${endCoord.y}`,
    "Z",
  ].join(" ");
}
