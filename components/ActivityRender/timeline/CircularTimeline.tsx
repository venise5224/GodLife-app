import useTodayActivities from "@/hooks/useTodayActivities";
import { useModalStore } from "@/stores/useModalStore";
import { useResetHourStore } from "@/stores/useResetHourStore";
import { polarToCartesian } from "@/utils/timeLine";
import { useEffect, useState } from "react";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import Svg, {
  Circle,
  ForeignObject,
  G,
  Text as SvgText,
} from "react-native-svg";
import TimelineActivity from "./TimelineActivity";

const SIZE = 500; // SVG 크기
const r = SIZE / 2 - 50; // 반지름
const cx = SIZE / 2;
const cy = SIZE / 2;

const CircularTimeline = () => {
  const [currentMinutes, setCurrentMinutes] = useState<number | null>(null);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const { resetHour } = useResetHourStore();
  const { openModal } = useModalStore();
  const activityList = useTodayActivities(); // 오늘의 활동들

  useEffect(() => {
    function getMinutes(date: Date) {
      return date.getHours() * 60 + date.getMinutes();
    }

    // 초기 시간 설정
    setCurrentMinutes(getMinutes(new Date()));

    // 1분마다 시간 갱신
    const timer = setInterval(() => {
      setCurrentMinutes(getMinutes(new Date()));
    }, 60 * 1000); // 1분마다 업데이트

    return () => clearInterval(timer); // 컴포넌트가 언마운트되면 타이머 정리
  }, []);

  // 활동 목록 정렬
  const sortedActivities = [...activityList];
  if (hoveredPath) {
    const idx = sortedActivities.findIndex((a) => a.id === hoveredPath);
    if (idx !== -1) {
      const [hovered] = sortedActivities.splice(idx, 1);
      sortedActivities.push(hovered); // 맨 뒤로 이동
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* 타임라인 SVG */}
      <Svg height="100%" width="100%" viewBox={`0 0 ${SIZE} ${SIZE}`}>
        {/* 배경 원 */}
        <Circle
          cx={cx}
          cy={cy}
          r={r}
          fill="#f8f9fa"
          stroke="#1e2939"
          strokeWidth="2"
        />

        {/* 활동 영역 */}
        {sortedActivities.map((activity) => (
          <TimelineActivity
            key={activity.id}
            activity={activity}
            cx={cx}
            cy={cy}
            r={r}
            hovered={hoveredPath === activity.id}
            onHover={setHoveredPath}
            currentMinutes={currentMinutes}
          />
        ))}

        {/* 시간 눈금 */}
        {Array.from({ length: 24 }).map((_, i) => {
          const pos = polarToCartesian(cx, cy, i * 60, r + 20);
          return (
            <G key={i}>
              <TouchableWithoutFeedback
                onPress={() => openModal("RESET_HOUR", { resetHour: i })}
              >
                <SvgText
                  x={pos.x}
                  y={pos.y}
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  fontSize={10}
                  fill="#000"
                  fontWeight="normal"
                >
                  {i !== resetHour && i}
                </SvgText>
              </TouchableWithoutFeedback>

              {i === resetHour && (
                <ForeignObject
                  x={pos.x - 12}
                  y={pos.y - 14}
                  width={25}
                  height={25}
                >
                  {/* React Native에서 사용할 수 있는 아이콘으로 대체 */}
                  <Text style={{ color: "red" }}>🔄</Text>{" "}
                  {/* 예시로 텍스트 아이콘 사용 */}
                </ForeignObject>
              )}
            </G>
          );
        })}
      </Svg>
    </View>
  );
};

export default CircularTimeline;
