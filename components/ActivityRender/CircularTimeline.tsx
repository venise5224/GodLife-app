import { useCurrentTime } from "@/hooks/useCurrentTime";
import useTodayActivities from "@/hooks/useTodayActivities";
import { useResetHourStore } from "@/stores/useResetHourStore";
import { polarToCartesian } from "@/utils/circleUtils";
import { getMinutes } from "@/utils/timeUtils";
import { useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Circle, Svg, Text as SvgText } from "react-native-svg";
import ResetTimer from "./ResetTimer";
import TimelineActivity from "./TimelineActivity";
import TimelineRunner from "./TimelineRunner";

const SIZE = 360; // SVG 크기
const r = SIZE / 2 - 30; // 반지름
const cx = SIZE / 2;
const cy = SIZE / 2;

const CircularTimeline = () => {
  const todayActivities = useTodayActivities();
  const currentTime = useCurrentTime();
  const currentMinutes = getMinutes(currentTime);
  const { resetHour } = useResetHourStore(); // 초기화 시간 (8시로 설정)
  const [filterMode, setFilterMode] = useState<"All" | "Plan" | "Log">("All");

  const toggleFilterMode = () => {
    setFilterMode((prev) =>
      prev === "All" ? "Plan" : prev === "Plan" ? "Log" : "All"
    );
  };

  const filteredActivities = useMemo(() => {
    if (filterMode === "All") {
      const logs = todayActivities.filter((a) => a.source === "Log");
      const plans = todayActivities.filter((a) => a.source === "Plan");

      // 순서: Plan 먼저 렌더링, Log 나중에 렌더링해서 위로
      return [...plans, ...logs];
    }

    // Plan 또는 Log만 선택된 경우
    return todayActivities.filter((a) => a.source === filterMode);
  }, [todayActivities, filterMode]);

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
              {i === resetHour ? "" : i}
            </SvgText>
          );
        })}

        <ResetTimer cx={cx} cy={cy} r={r} resetHour={resetHour} />

        {filteredActivities.map((activity) => (
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

      {/* 중앙 동그란 버튼 */}
      <TouchableOpacity
        onPress={toggleFilterMode}
        style={{
          position: "absolute",
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: "#1e293b",
          alignItems: "center",
          justifyContent: "center",
          top: SIZE / 2 - 20,
          left: SIZE / 2 - 20,
          zIndex: 10, // SVG 위에 올라오게
        }}
      >
        <Text style={{ color: "white", fontSize: 12 }}>{filterMode}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CircularTimeline;
