import { ClipboardClock } from "lucide-react-native";
import { Text, View } from "react-native";

const PlanVsLogStatsHeader = () => {
  const config = {
    title: "계획 대비 기록 통계",
    description:
      "세운 계획과 실제 기록을 비교하여 달성률을 확인할 수 있습니다.",
    label: "계획 시간",
  };

  return (
    <View className="p-3 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
      {/* 제목 + 아이콘 */}
      <View className="flex-row items-center space-x-2">
        <ClipboardClock size={24} color="#15803d" />
        <Text className="text-sm font-bold"> {config.title}</Text>
      </View>

      {/* 설명 */}
      <Text className="mt-1 text-sm text-gray-500">{config.description}</Text>

      {/* 헤더 라벨: 이름 | 계획/기록 | 달성률 */}
      <View className="mt-2 flex-row justify-between items-center text-gray-700">
        <Text className="text-sm text-left flex-1">이름</Text>
        <Text className="text-sm text-center flex-1">
          계획 시간 / 기록 시간
        </Text>
        <Text className="text-sm text-right flex-1">달성률</Text>
      </View>
    </View>
  );
};

export default PlanVsLogStatsHeader;
