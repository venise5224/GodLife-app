import { Activity } from "@/types/Activity";
import { formatTime } from "@/utils/timeUtils";
import { Pressable, Text, View } from "react-native";

interface Props {
  activity: Activity;
  onDelete: () => void;
}

const RowItem = ({ activity, onDelete }: Props) => {
  let duration: string | null = null;

  if (activity.startTime && activity.endTime) {
    const diffMs = activity.endTime - activity.startTime;
    const diffMins = Math.floor(diffMs / 1000 / 60);
    const h = Math.floor(diffMins / 60);
    const m = diffMins % 60;
    duration = h > 0 ? `${h}시간 ${m}분` : `${m}분`;
  }

  const isOngoing = !activity.endTime;

  return (
    <View className="flex-row items-center p-2 border rounded-lg mb-2">
      {/* 이름 */}
      <Text className="w-[50px] text-xs">{activity.activityName}</Text>

      {/* Source */}
      <Text
        className={`w-[50px] text-center px-2 py-0.5 rounded-full text-xs border
            ${
              activity.source === "Plan"
                ? "border-amber-300"
                : "border-green-300"
            }`}
      >
        {activity.source}
      </Text>

      {/* 시작 */}
      <Text className="w-[60px] text-center text-xs">
        {formatTime(activity.startTime)}
      </Text>

      {/* 종료 */}
      <Text className="w-[60px] text-center text-xs">
        {formatTime(activity.endTime) ?? "-"}
      </Text>

      {/* 소요 시간 */}
      <View className="w-[60px]">
        {duration ? (
          <Text className="text-center text-xs">{duration}</Text>
        ) : isOngoing ? (
          <Text className="text-center text-xs text-red-500">진행중</Text>
        ) : (
          <Text className="text-xs">-</Text>
        )}
      </View>

      {/* 삭제 */}
      <View className="w-[20px] items-center">
        {!isOngoing ? (
          <Pressable onPress={onDelete}>
            <Text>🗑</Text>
          </Pressable>
        ) : (
          <Text className="text-xs">-</Text>
        )}
      </View>
    </View>
  );
};

export default RowItem;
