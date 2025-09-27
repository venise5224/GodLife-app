import { useActivityStore } from "@/stores/useActivityStore";
import { Activity } from "@/types/Activity";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import CurrentTime from "./CurrentTime";
import ElapsedTime from "./ElapsedTime";

const ActivityLogger = () => {
  const [activityName, setActivityName] = useState("");
  const { runningActivity, setRunningActivity, addActivity, updateActivity } =
    useActivityStore();

  const handleStart = () => {
    if (runningActivity) return;
    if (!activityName.trim()) return;

    const newActivity: Activity = {
      id: Date.now().toString(),
      activityName,
      startTime: Date.now().toString(),
      source: "Log",
    };

    addActivity(newActivity);
    setRunningActivity(newActivity);
    setActivityName("");
  };

  const handleEnd = () => {
    if (!runningActivity) return;

    const finishedActivity: Activity = {
      ...runningActivity,
      endTime: Date.now().toString(),
    };

    updateActivity(finishedActivity);
    setRunningActivity(null);
    setActivityName("");
  };

  const handleChangeActivityName = (name: string) => {
    if (runningActivity) {
      updateActivity({ ...runningActivity, activityName: name });
    }
  };

  return (
    <>
      {/* 디스플레이 영역 */}
      <View className="p-2 rounded-xl items-center bg-gray-800 ">
        {runningActivity ? (
          <>
            <TextInput
              value={runningActivity.activityName}
              onChangeText={(text) =>
                setRunningActivity({
                  ...runningActivity,
                  activityName: text,
                })
              }
              onBlur={() =>
                handleChangeActivityName(runningActivity.activityName)
              }
              className="text-sm text-center text-white"
            />
            <ElapsedTime startTime={runningActivity.startTime} />
          </>
        ) : (
          <>
            <TextInput
              value={activityName}
              onChangeText={setActivityName}
              placeholder="할 일을 입력하세요"
              placeholderTextColor="#ffffff"
              className="text-sm text-center text-white"
              onSubmitEditing={handleStart}
            />
            <CurrentTime />
          </>
        )}
      </View>

      {/* 버튼 영역 */}
      <View className="mt-2 flex-row justify-around gap-2">
        <Pressable
          onPress={handleStart}
          disabled={!!runningActivity || !activityName.trim()}
          className="bg-green-500 px-4 py-2 rounded-full flex-1 items-center"
        >
          <Text>Start</Text>
        </Pressable>
        <Pressable
          onPress={handleEnd}
          disabled={!runningActivity}
          className="bg-red-500 px-4 py-2 rounded-full flex-1 items-center"
        >
          <Text>End</Text>
        </Pressable>
      </View>
    </>
  );
};

export default ActivityLogger;
