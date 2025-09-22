import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import CircularTimeline from "./timeline/CircularTimeline";

type TabType = "timeline" | "list";

const tabs: { label: string; value: TabType }[] = [
  { label: "타임라인", value: "timeline" },
  { label: "활동 목록", value: "list" },
];

export default function ActivityRender() {
  const [renderTab, setRenderTab] = useState<"timeline" | "list">("timeline");

  return (
    <View className="flex-1 w-full">
      {/* 탭 버튼 */}
      <View className="flex flex-row border-b border-gray-300">
        {tabs.map((tab) => (
          <Pressable
            key={tab.value}
            className={`flex-1 p-2 items-center ${
              renderTab === tab.value
                ? "border-b-2 border-blue-500"
                : "text-gray-500"
            }`}
            onPress={() => setRenderTab(tab.value)}
          >
            <Text
              className={`font-semibold ${
                renderTab === tab.value ? "text-blue-500" : "text-gray-500"
              }`}
            >
              {tab.label}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* 탭 컨텐츠 */}
      <View className="mt-2 flex-1">
        {renderTab === "timeline" ? (
          <CircularTimeline />
        ) : (
          <View className="px-2 flex-1">
            <View>활동 목록 화면</View>
          </View>
        )}
      </View>
    </View>
  );
}
