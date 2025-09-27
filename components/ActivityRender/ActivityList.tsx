import { useActivityStore } from "@/stores/useActivityStore";
import { useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import ActivityFilter from "./ActivityFilter";
import ListHeader from "./ListHeader";
import RowItem from "./RowItem";

const ActivityList = () => {
  const [filter, setFilter] = useState<"All" | "Plan" | "Log">("All");
  const { activityList, removeActivity } = useActivityStore();

  // 필터링 + 정렬만 수행
  const filteredActivityList = useMemo(() => {
    let filtered = activityList;

    if (filter !== "All") {
      filtered = filtered.filter((activity) => activity.source === filter);
    }

    filtered = filtered.slice().sort((a, b) => {
      // 진행중인 활동 최상단
      if (!a.endTime) return -1;
      if (!b.endTime) return 1;

      // 시작시간 최신순
      return (
        new Date(b.startTime ?? 0).getTime() -
        new Date(a.startTime ?? 0).getTime()
      );
    });

    return filtered;
  }, [activityList, filter]);

  return (
    <View className="flex-1 p-4 bg-white rounded-2xl border-2 border-gray-200 shadow-lg mx-2">
      <View className="flex-row justify-between items-center">
        <Text className="text-xl font-bold">활동 목록</Text>
        <ActivityFilter filter={filter} onChange={setFilter} />
      </View>

      <ListHeader />

      <ScrollView className="mt-2">
        {filteredActivityList.length === 0 ? (
          <Text className="text-center text-gray-400 py-6">
            항목이 없습니다.
          </Text>
        ) : (
          filteredActivityList.map((activity) => (
            <RowItem
              key={activity.id}
              activity={activity}
              onDelete={() => removeActivity(activity.id)}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default ActivityList;
