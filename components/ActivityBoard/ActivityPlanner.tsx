import { useActivityStore } from "@/stores/useActivityStore";
import { Activity } from "@/types/Activity";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

const ActivityLogger = () => {
  const { addActivity } = useActivityStore();
  const [activityName, setActivityName] = useState("");
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const handleSave = () => {
    if (!activityName || !startTime || !endTime) {
      alert("이름, 시작 시간, 종료 시간을 모두 입력해주세요.");
      return;
    }

    if (endTime <= startTime) {
      alert("종료 시간은 시작 시간보다 나중이어야 합니다.");
      return;
    }

    const newActivity: Activity = {
      id: Date.now().toString(),
      activityName,
      startTime: startTime.getTime(),
      endTime: endTime.getTime(),
      source: "Plan",
    };

    addActivity(newActivity);
    setActivityName("");
    setStartTime(null);
    setEndTime(null);
  };
  return (
    <>
      {/* 디스플레이 영역 */}
      <View className="p-2 rounded-xl items-center bg-gray-800 ">
        <TextInput
          placeholder="할 일을 입력하세요"
          placeholderTextColor="#ffffff"
          value={activityName}
          onChangeText={setActivityName}
          className="text-sm text-center text-white"
        />
        <Pressable
          onPress={handleSave}
          className="bg-yellow-500 rounded-full w-[80px] items-center"
        >
          <Text>저장</Text>
        </Pressable>
      </View>

      {/* 버튼 영역 */}
      <View className="mt-2 flex-row justify-around gap-2">
        <Pressable
          onPress={() => setShowStartPicker(true)}
          className="bg-green-500 px-4 py-2 rounded-full flex-1 items-center"
        >
          {startTime ? (
            <Text className="text-white text-xs mt-1">
              {startTime.toLocaleTimeString()}
            </Text>
          ) : (
            <Text>시작 시간</Text>
          )}
        </Pressable>
        <Pressable
          onPress={() => setShowEndPicker(true)}
          className="bg-red-500 px-4 py-2 rounded-full flex-1 items-center"
        >
          {endTime ? (
            <Text className="text-white text-xs mt-1">
              {endTime.toLocaleTimeString()}
            </Text>
          ) : (
            <Text>종료 시간</Text>
          )}
        </Pressable>

        {/* 시작 시간 선택기 */}
        {showStartPicker && (
          <DateTimePicker
            mode="time"
            value={startTime || new Date()}
            is24Hour
            onChange={(_, selectedDate) => {
              setShowStartPicker(false);
              if (selectedDate) setStartTime(selectedDate);
            }}
          />
        )}

        {/* 종료 시간 선택기 */}
        {showEndPicker && (
          <DateTimePicker
            mode="time"
            value={endTime || new Date()}
            is24Hour
            onChange={(_, selectedDate) => {
              setShowEndPicker(false);
              if (selectedDate) setEndTime(selectedDate);
            }}
          />
        )}
      </View>
    </>
  );
};

export default ActivityLogger;
