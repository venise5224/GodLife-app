import { Calendar, Clock } from "lucide-react-native"; // 또는 @expo/vector-icons
import { Text, View } from "react-native";

interface ActivityStatsHeaderProps {
  totalMinutes: number;
  source: "Plan" | "Log";
}

export default function ActivityStatsHeader({
  totalMinutes,
  source,
}: ActivityStatsHeaderProps) {
  const percentOfDay = (totalMinutes / 1440) * 100;

  const config =
    source === "Plan"
      ? {
          title: "계획 통계",
          description: "오늘 세운 계획을 시간 단위로 확인할 수 있습니다.",
          icon: <Calendar size={24} color="#f97316" />, // orange-500
          label: "계획 시간",
          color: "bg-orange-500",
        }
      : {
          title: "기록 통계",
          description: "실제로 기록된 활동들의 사용 시간을 분석했습니다.",
          icon: <Clock size={24} color="#3b82f6" />, // blue-500
          label: "기록 시간",
          color: "bg-blue-500",
        };

  return (
    <View className="p-4 bg-gray-100 rounded-xl border border-gray-200 space-y-3">
      {/* 제목 & 아이콘 */}
      <View className="flex-row items-center space-x-2">
        {config.icon}
        <Text className="text-base font-bold"> {config.title}</Text>
      </View>

      {/* 설명 */}
      <Text className="text-sm text-gray-500">{config.description}</Text>

      {/* 총 시간 */}
      <Text className="text-base text-gray-700 font-medium">
        총 {config.label}: {Math.floor(totalMinutes / 60)}시간{" "}
        {totalMinutes % 60}분
      </Text>

      {/* 퍼센트 그래프 */}
      <View className="flex-row items-center space-x-2">
        <View className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
          <View
            className={`h-3 ${config.color}`}
            style={{ width: `${Math.min(percentOfDay, 100)}%` }}
          />
        </View>
        <Text className="text-xs text-gray-500 mt-0.5">
          {percentOfDay.toFixed(1)}% of 24h
        </Text>
      </View>
    </View>
  );
}
