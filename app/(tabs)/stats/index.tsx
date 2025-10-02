import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import ActivityStats from "./components/ActivityStats";

const Stats = () => {
  const [activeTab, setActiveTab] = useState<"Plan" | "Log" | "PlanVsLog">(
    "Plan"
  );

  const tabs = [
    { key: "Plan", label: "계획" },
    { key: "Log", label: "기록" },
    { key: "PlanVsLog", label: "계획 대비 기록" },
  ] as const;

  return (
    <View className="flex-1">
      {/* 탭 버튼 */}
      <View className="flex-row border-b border-gray-300">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;

          return (
            <Pressable
              key={tab.key}
              className={`flex-1 p-2 items-center ${
                isActive ? "border-b-2 border-blue-500" : "text-gray-500"
              }`}
              onPress={() => setActiveTab(tab.key)}
            >
              <Text
                className={`font-semibold text-sm ${
                  isActive ? "text-blue-500" : "text-gray-500"
                }`}
              >
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* 탭 컨텐츠 */}
      <View className="flex-1 p-4">
        <ScrollView>
          {activeTab === "Plan" && <ActivityStats source="Plan" />}
          {activeTab === "Log" && <ActivityStats source="Log" />}
          {activeTab === "PlanVsLog" && <Text>계획 대비 기록 통계</Text>}
        </ScrollView>
      </View>
    </View>
  );
};

export default Stats;
