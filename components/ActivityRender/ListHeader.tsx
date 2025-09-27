import { Text, View } from "react-native";

const ListHeader = () => {
  return (
    <View className="flex-row px-2 py-2 text-xs text-gray-500 border-b mb-2">
      <Text className="flex-1">이름</Text>
      <Text className="w-20 text-center">Source</Text>
      <Text className="w-20 text-center">시작</Text>
      <Text className="w-20 text-center">종료</Text>
      <Text className="w-20 text-center">소요 시간</Text>
      <Text className="w-12 text-center">삭제</Text>
    </View>
  );
};

export default ListHeader;
