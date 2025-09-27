import { Activity } from "@/types/Activity";
import { TIME_FMT } from "@/utils/constants";
import { differenceInMinutes, parse } from "date-fns";
import { Pressable, Text, View } from "react-native";

interface Props {
  activity: Activity;
  onDelete: () => void;
}

const RowItem = ({ activity, onDelete }: Props) => {
  // duration 계산
  let duration: string | null = null;

  if (activity.startTime && activity.endTime) {
    try {
      const start = parse(activity.startTime, TIME_FMT, new Date());
      const end = parse(activity.endTime, TIME_FMT, new Date());
      const mins = differenceInMinutes(end, start);
      const h = Math.floor(mins / 60);
      const m = mins % 60;
      duration = h > 0 ? `${h}시간 ${m}분` : `${m}분`;
    } catch {
      duration = null;
    }
  }

  const isOngoing = !activity.endTime;

  return (
    <View className="flex-row items-center gap-2 p-2 border rounded-lg mb-2">
      {/* 이름 */}
      <Text className="flex-1 text-xs">{activity.activityName}</Text>

      {/* Source */}
      <View className="w-20 items-center">
        <Text
          className={`px-2 py-0.5 rounded-full text-xs border
            ${
              activity.source === "Plan"
                ? "border-amber-300"
                : "border-green-300"
            }`}
        >
          {activity.source}
        </Text>
      </View>

      {/* 시작 */}
      <Text className="w-20 text-center text-xs">
        {activity.startTime ?? "-"}
      </Text>

      {/* 종료 */}
      <Text className="w-20 text-center text-xs">
        {activity.endTime ?? "-"}
      </Text>

      {/* 소요 시간 */}
      <View className="w-20 items-center">
        {duration ? (
          <Text className="text-xs">{duration}</Text>
        ) : isOngoing ? (
          <Text className="text-xs text-red-500">진행중</Text>
        ) : (
          <Text className="text-xs">-</Text>
        )}
      </View>

      {/* 삭제 */}
      <View className="w-12 items-center">
        {!isOngoing ? (
          <Pressable onPress={onDelete}>
            <Text className="text-red-500 text-base">🗑</Text>
          </Pressable>
        ) : (
          <Text className="text-xs">-</Text>
        )}
      </View>
    </View>
  );
};

export default RowItem;
