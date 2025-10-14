import { useCurrentTime } from "@/hooks/useCurrentTime";
import { Text } from "react-native";

const CurrentTime = () => {
  const currentTime = useCurrentTime();

  return (
    <Text className="text-yellow-500">{currentTime.toLocaleTimeString()}</Text>
  );
};

export default CurrentTime;
