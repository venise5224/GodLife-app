import { useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function ActivityRender() {
  const [renderTab, setRenderTab] = useState<"timeline" | "list">("timeline");

  return (
    <View className="flex-1 w-full">
      {/* 탭 버튼 */}
      <View className="flex flex-row border-b border-gray-300">
        <Pressable
          className={`flex-1 p-2 items-center ${
            renderTab === "timeline"
              ? "border-b-2 border-blue-500"
              : "text-gray-500"
          }`}
          onPress={() => setRenderTab("timeline")}
        >
          <Text
            className={`font-semibold ${
              renderTab === "timeline" ? "text-blue-500" : "text-gray-500"
            }`}
          >
            타임라인
          </Text>
        </Pressable>

        <Pressable
          className={`flex-1 p-2 items-center ${
            renderTab === "list"
              ? "border-b-2 border-blue-500"
              : "text-gray-500"
          }`}
          onPress={() => setRenderTab("list")}
        >
          <Text
            className={`font-semibold ${
              renderTab === "list" ? "text-blue-500" : "text-gray-500"
            }`}
          >
            활동 목록
          </Text>
        </Pressable>
      </View>

      {/* 탭 컨텐츠 */}
      <View className="mt-2 flex-1">
        {renderTab === "timeline" ? (
          <View>타임라인 화면</View>
        ) : (
          <View className="px-2 flex-1">
            <View>활동 목록 화면</View>
          </View>
        )}
      </View>
    </View>
  );
}
