import runner from "@/assets/lottie/runner.json";
import { getCurrentMinutes } from "@/utils/getCurrentMinutes";
import { polarToCartesian } from "@/utils/polarToCartesian";
import LottieView from "lottie-react-native";
import { useEffect, useState } from "react";

interface TimelineRunnerProps {
  cx: number;
  cy: number;
  r: number;
}

const TimelineRunner = ({ cx, cy, r }: TimelineRunnerProps) => {
  const [currentMinutes, setCurrentMinutes] = useState(getCurrentMinutes());
  const runnerPosition = polarToCartesian(cx, cy, currentMinutes, r - 45);

  useEffect(() => {
    const currentTimer = setInterval(() => {
      setCurrentMinutes(getCurrentMinutes());
    }, 1000);
    return () => clearInterval(currentTimer);
  }, []);

  return (
    <LottieView
      source={runner}
      autoPlay
      loop
      style={{
        width: 60,
        height: 60,
        left: runnerPosition.x - 30, // 중심 맞춤
        top: runnerPosition.y - 30,
        transform: [{ rotate: `${runnerPosition.deg}deg` }],
      }}
    />
  );
};

export default TimelineRunner;
