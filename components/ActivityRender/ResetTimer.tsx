import { polarToCartesian } from "@/utils/circleUtils";
import { Image } from "react-native";

interface ResetTimerProps {
  cx: number;
  cy: number;
  r: number;
  resetHour: number; // 리셋 시간 (시간 단위)
}

const ResetTimer = ({ cx, cy, r, resetHour }: ResetTimerProps) => {
  // 리셋 타이머의 위치 계산
  const resetPosition = polarToCartesian(cx, cy, resetHour * 60, r + 15); // resetHour는 분으로 변환

  return (
    <Image
      source={require("@/assets/icons/ResetTimer.png")} // 이미지 파일을 require로 불러옴
      style={{
        width: 24,
        height: 24,
        position: "absolute",
        left: resetPosition.x - 12,
        top: resetPosition.y - 12,
      }}
    />
  );
};

export default ResetTimer;
