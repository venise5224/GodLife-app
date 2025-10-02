import { Text, View } from "react-native";

interface ActivityRow {
  name: string;
  minutes: number;
  percentOfDay: number;
  percentOfTotal: number;
}

interface ActivityStatItemProps {
  row: ActivityRow;
  source: "Plan" | "Log";
}

const ActivityStatItem = ({ row, source }: ActivityStatItemProps) => {
  const config =
    source === "Plan"
      ? {
          colorDay: "text-orange-500",
          barDay: "bg-orange-500",
          colorTotal: "text-yellow-500",
          barTotal: "bg-yellow-500",
        }
      : {
          colorDay: "text-blue-500",
          barDay: "bg-blue-500",
          colorTotal: "text-green-500",
          barTotal: "bg-green-500",
        };

  return (
    <View className="p-3 border rounded-xl shadow-sm bg-white space-y-2">
      {/* 이름 + 시간 */}
      <View className="flex-row justify-between items-center">
        <Text className="text-base font-semibold">{row.name}</Text>
        <Text className="text-sm text-gray-500">
          {Math.floor(row.minutes / 60)}시간 {row.minutes % 60}분
        </Text>
      </View>

      {/* 24시간 대비 */}
      <View className="flex-row items-center space-x-2">
        <Text className={`text-xs w-[96px] ${config.colorDay}`}>
          24시간 대비
        </Text>
        <View className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
          <View
            className={`h-3 ${config.barDay}`}
            style={{ width: `${row.percentOfDay}%` }}
          />
        </View>
        <Text className={`text-xs w-[48px] text-right ${config.colorDay}`}>
          {row.percentOfDay.toFixed(1)}%
        </Text>
      </View>

      {/* 전체 대비 */}
      <View className="flex-row items-center space-x-2">
        <Text className={`text-xs w-[96px] ${config.colorTotal}`}>
          전체 {source === "Plan" ? "계획" : "기록"} 대비
        </Text>
        <View className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
          <View
            className={`h-3 ${config.barTotal}`}
            style={{ width: `${row.percentOfTotal}%` }}
          />
        </View>
        <Text className={`text-xs w-[48px] text-right ${config.colorTotal}`}>
          {row.percentOfTotal.toFixed(1)}%
        </Text>
      </View>
    </View>
  );
};

export default ActivityStatItem;
