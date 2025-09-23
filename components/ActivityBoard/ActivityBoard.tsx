import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import ActivityLogger from "./ActivityLogger";
import ActivityPlanner from "./ActivityPlanner";

export default function ActivityBoard() {
  const [boardTab, setBoardTab] = useState<"logger" | "planner">("logger");

  return (
    <View className="w-full">
      {/* 탭 버튼 */}
      <View className="flex flex-row">
        <Pressable
          className={`flex-1 p-2 items-center ${
            boardTab === "logger"
              ? "bg-white border-2 border-b-0"
              : "bg-gray-200 border-b-2"
          }`}
          onPress={() => setBoardTab("logger")}
        >
          <Text
            className={`${
              boardTab === "logger" ? "text-black" : "text-gray-700"
            }`}
          >
            할 일 기록
          </Text>
        </Pressable>

        <Pressable
          className={`flex-1 p-2 items-center ${
            boardTab === "planner"
              ? "bg-white border-2 border-b-0"
              : "bg-gray-200 border-b-2"
          }`}
          onPress={() => setBoardTab("planner")}
        >
          <Text
            className={`${
              boardTab === "planner" ? "text-black" : "text-gray-700"
            }`}
          >
            할 일 계획
          </Text>
        </Pressable>
      </View>

      {/* 탭 컨텐츠 */}
      <View className="border-2 border-t-0 rounded-b-2xl p-2 bg-white">
        {boardTab === "logger" ? <ActivityLogger /> : <ActivityPlanner />}
      </View>
    </View>
  );
}
