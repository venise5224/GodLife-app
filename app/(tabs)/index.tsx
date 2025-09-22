import ActivityBoard from "@/components/ActivityBoard/ActivityBoard";
import ActivityRender from "@/components/ActivityRender/ActivityRender";
import { View } from "react-native";

export default function HomePage() {
  return (
    <View className="flex-1">
      {/* 상단: 타임라인 / 활동목록 (탭) */}
      <View className="flex-1">
        <ActivityRender />
      </View>

      {/* 하단: 기록 / 계획 (탭) */}
      <View className="p-4">
        <ActivityBoard />
      </View>
    </View>
  );
}
