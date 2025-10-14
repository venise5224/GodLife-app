import useGroupedActivities from "@/hooks/useGroupedActivities";
import { Text, View } from "react-native";
import ActivityStatsHeader from "./ActivityStatsHeader";
import ActivityStatItem from "./ActivityStatsItem";

interface ActivityStatsProps {
  source: "Plan" | "Log";
}

const ActivityStats = ({ source }: ActivityStatsProps) => {
  const { totalMinutes, grouped } = useGroupedActivities(source);

  return (
    <View className="space-y-4">
      <ActivityStatsHeader totalMinutes={totalMinutes} source={source} />

      {grouped.length > 0 ? (
        grouped.map((row) => (
          <View key={row.name} className="mt-4">
            <ActivityStatItem row={row} source={source} />
          </View>
        ))
      ) : (
        <Text className="mt-2 text-center text-gray-500">
          활동 {source === "Plan" ? "계획" : "기록"}이 없습니다.
        </Text>
      )}
    </View>
  );
};

export default ActivityStats;
