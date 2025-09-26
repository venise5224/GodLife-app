import runner from "@/assets/lottie/runner.json";
import { polarToCartesian } from "@/utils/circleUtils";
import LottieView from "lottie-react-native";

interface TimelineRunnerProps {
  cx: number;
  cy: number;
  r: number;
  currentMinutes: number;
}

const TimelineRunner = ({ cx, cy, r, currentMinutes }: TimelineRunnerProps) => {
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
