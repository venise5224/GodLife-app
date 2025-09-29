import { useCurrentTime } from "@/hooks/useCurrentTime";
import { useActivityStore } from "@/stores/useActivityStore";
import { polarToCartesian } from "@/utils/circleUtils";
import { getMinutes } from "@/utils/timeUtils";
import { View } from "react-native";
import { Circle, Svg, Text as SvgText } from "react-native-svg";
import TimelineActivity from "./TimelineActivity";
import TimelineRunner from "./TimelineRunner";

const SIZE = 360; // SVG 크기
const r = SIZE / 2 - 30; // 반지름
const cx = SIZE / 2;
const cy = SIZE / 2;

const CircularTimeline = () => {
  const activityList = useActivityStore((state) => state.activityList);
  const currentTime = useCurrentTime();
  const currentMinutes = getMinutes(currentTime);

  return (
    <View className="relative w-[360px] h-[360px] items-center justify-center">
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

        {/* 활동 목록 */}
        {activityList.map((activity) => (
          <TimelineActivity
            key={activity.id}
            activity={activity}
            cx={cx}
            cy={cy}
            r={r}
            currentMinutes={currentMinutes}
          />
        ))}

        {/* 현재 시간 표시 */}
        <TimelineRunner cx={cx} cy={cy} r={r} currentMinutes={currentMinutes} />
      </Svg>
    </View>
  );
};

export default CircularTimeline;
