import useGroupedActivities from "@/hooks/useGroupedActivities";
import { Text, View } from "react-native";
import PlanVsLogStatsHeader from "./PlanVsLogStatsHeader";

const PlanVsLogStats = () => {
  const { grouped: planGrouped } = useGroupedActivities("Plan");
  const { grouped: logGrouped } = useGroupedActivities("Log");

  // 계획에 있는 활동들을 기준으로 삼음
  const activities = planGrouped.map((a) => a.name);

  // 계획과 기록을 합침
  const grouped = activities.map((name) => {
    const planMinutes = planGrouped.find((a) => a.name === name)?.minutes ?? 0;
    const logMinutes = logGrouped.find((a) => a.name === name)?.minutes ?? 0;

    return {
      name,
      planMinutes,
      logMinutes,
      percentOfPlan: (logMinutes / planMinutes) * 100,
    };
  });

  const getBarColor = (percent: number) => {
    if (percent < 50) return "bg-red-500";
    if (percent < 80) return "bg-orange-500";
    if (percent <= 100) return "bg-green-500";
    return "bg-green-700";
  };

  return (
    <View className="space-y-4">
      <PlanVsLogStatsHeader />

      {grouped.length > 0 ? (
        grouped.map((row) => (
          <View
            key={row.name}
            className="mt-4 p-3 border border-gray-200 rounded-xl shadow-sm bg-white space-y-2"
          >
            {/* 첫 줄: 이름 | 계획시간 / 실제시간 | 달성률 */}
            <View className="flex-row justify-between items-center">
              <Text className="text-xs font-semibold">{row.name}</Text>
              <Text className="text-xs">
                {Math.floor(row.planMinutes / 60)}h {row.planMinutes % 60}m /{" "}
                {Math.floor(row.logMinutes / 60)}h {row.logMinutes % 60}m
              </Text>
              <Text
                className={`text-xs font-medium ${getBarColor(
                  row.percentOfPlan
                ).replace("bg-", "text-")}`}
              >
                {row.percentOfPlan.toFixed(1)}%
              </Text>
            </View>

            {/* 진행 바 */}
            <View className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <View
                className={`h-3 ${getBarColor(row.percentOfPlan)}`}
                style={{
                  width: `${Math.min(row.percentOfPlan, 100)}%`,
                }}
              />
            </View>
          </View>
        ))
      ) : (
        <Text className="mt-2 text-center text-gray-500">
          활동 계획이 없습니다.
        </Text>
      )}
    </View>
  );
};

export default PlanVsLogStats;
