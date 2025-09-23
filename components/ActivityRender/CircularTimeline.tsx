import { polarToCartesian } from "@/utils/polarToCartesian";
import { Circle, Svg, Text as SvgText } from "react-native-svg";
import TimelineRunner from "./TimelineRunner";

const SIZE = 400; // SVG 크기
const r = SIZE / 2 - 30; // 반지름
const cx = SIZE / 2;
const cy = SIZE / 2;

const CircularTimeline = () => {
  return (
    <Svg width="100%" height="100%" viewBox={`0 0 ${SIZE} ${SIZE}`}>
      {/* 배경 원 */}
      <Circle
        cx={cx}
        cy={cy}
        r={r}
        fill="#f8f9fa"
        stroke="#1e2939"
        strokeWidth={2}
      />

      {/* 24시간 눈금 */}
      {Array.from({ length: 24 }).map((_, i) => {
        const hourPosition = polarToCartesian(cx, cy, i * 60, r + 15);
        return (
          <SvgText
            key={i}
            x={hourPosition.x}
            y={hourPosition.y}
            fontSize={10}
            fill="black"
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            {i}
          </SvgText>
        );
      })}

      {/* 현재 시간 표시 */}
      <TimelineRunner cx={cx} cy={cy} r={r} />
    </Svg>
  );
};

export default CircularTimeline;
