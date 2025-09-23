import { Pressable, Text, TextInput, View } from "react-native";

const ActivityLogger = () => {
  return (
    <>
      {/* 디스플레이 영역 */}
      <View className="p-2 rounded-xl items-center bg-gray-800 ">
        <TextInput
          placeholder="할 일을 입력하세요"
          placeholderTextColor="#ffffff"
          className="text-sm text-center text-white"
        />
        <Pressable className="bg-yellow-500 rounded-full w-[80px] items-center">
          <Text>저장</Text>
        </Pressable>
      </View>

      {/* 버튼 영역 */}
      <View className="mt-2 flex-row justify-around gap-2">
        <Pressable className="bg-green-500 px-4 py-2 rounded-full flex-1 items-center">
          <Text>시작 시간</Text>
        </Pressable>
        <Pressable className="bg-red-500 px-4 py-2 rounded-full flex-1 items-center">
          <Text>종료 시간</Text>
        </Pressable>
      </View>
    </>
  );
};

export default ActivityLogger;
