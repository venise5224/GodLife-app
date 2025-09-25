import runner from "@/assets/lottie/runner.json";
import { useCurrentTime } from "@/hooks/useCurrentTime";
import { getCurrentMinutes } from "@/utils/getCurrentMinutes";
import { polarToCartesian } from "@/utils/polarToCartesian";
import LottieView from "lottie-react-native";

interface TimelineRunnerProps {
  cx: number;
  cy: number;
  r: number;
}

const TimelineRunner = ({ cx, cy, r }: TimelineRunnerProps) => {
  const currentTime = useCurrentTime(); // 현재 시간
  const currentMinutes = getCurrentMinutes(currentTime); // 현재 시간을 분 단위로 변환
  const runnerPosition = polarToCartesian(cx, cy, currentMinutes, r - 35);

  return (
    <LottieView
      source={runner}
      autoPlay
      loop
      style={{
        width: 60,
        height: 60,
        position: "absolute",
        left: runnerPosition.x - 30, // 중심 맞춤
        top: runnerPosition.y - 30,
        transform: [{ rotate: `${runnerPosition.deg}deg` }],
      }}
    />
  );
};

export default TimelineRunner;
