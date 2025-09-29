import { useEffect, useState } from "react";
import { Text } from "react-native";

interface ElapsedTimeProps {
  startTime: number;
}

const ElapsedTime = ({ startTime }: ElapsedTimeProps) => {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = Date.now() - startTime;
      setElapsed(diff);
    }, 1000); // 1초마다 갱신

    return () => clearInterval(interval);
  }, [startTime]);

  // 밀리초 → 시:분:초 포맷 변환
  const hours = Math.floor(elapsed / (1000 * 60 * 60));
  const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((elapsed % (1000 * 60)) / 1000);

  const hh = hours.toString().padStart(2, "0");
  const mm = minutes.toString().padStart(2, "0");
  const ss = seconds.toString().padStart(2, "0");

  let formatted = "";
  if (hours > 0) {
    formatted = `${hh}시간 ${mm}분 ${ss}초`;
  } else if (minutes > 0) {
    formatted = `${mm}분 ${ss}초`;
  } else {
    formatted = `${ss}초`;
  }

  return <Text className="text-yellow-500">{formatted} 진행 중</Text>;
};

export default ElapsedTime;
