import { Pressable, Text, TextInput, View } from "react-native";
import CurrentTime from "./CurrentTime";

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
        <CurrentTime />
      </View>

      {/* 버튼 영역 */}
      <View className="mt-2 flex-row justify-around gap-2">
        <Pressable className="bg-green-500 px-4 py-2 rounded-full flex-1 items-center">
          <Text>Start</Text>
        </Pressable>
        <Pressable className="bg-red-500 px-4 py-2 rounded-full flex-1 items-center">
          <Text>End</Text>
        </Pressable>
      </View>
    </>
  );
};

export default ActivityLogger;
