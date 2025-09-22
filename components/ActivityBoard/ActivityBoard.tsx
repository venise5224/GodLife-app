import { useState } from "react";
import { Pressable, Text, View } from "react-native";

type TabType = "logger" | "planner";

const tabs: { label: string; value: TabType }[] = [
  { label: "할 일 기록", value: "logger" },
  { label: "할 일 계획", value: "planner" },
];

export default function ActivityBoard() {
  const [boardTab, setBoardTab] = useState<"logger" | "planner">("logger");

  return (
    <View className="w-full">
      {/* 탭 버튼 */}
      <View className="flex flex-row">
        {tabs.map((tab) => (
          <Pressable
            key={tab.value}
            className={`flex-1 p-2 items-center ${
              boardTab === tab.value
                ? "bg-white border-2 border-b-0"
                : "bg-gray-200 border-b-2"
            }`}
            onPress={() => setBoardTab(tab.value)}
          >
            <Text
              className={`${
                boardTab === tab.value ? "text-black" : "text-gray-700"
              }`}
            >
              {tab.label}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* 탭 컨텐츠 */}
      <View className="border-2 border-t-0 rounded-b-2xl p-4">
        {boardTab === "logger" ? (
          <View>활동 기록</View>
        ) : (
          <View>활동 계획</View>
        )}
      </View>
    </View>
  );
}
