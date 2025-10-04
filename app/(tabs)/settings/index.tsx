import { Pressable, Text, View } from "react-native";

const Settings = () => {
  const settingItems = [
    { label: "다크모드" },
    { label: "언어 선택" },
    { label: "초기화 시각 설정" },
    { label: "로그아웃" },
  ];

  return (
    <View className="px-4 py-6 max-w-xl w-full self-center">
      <Text className="text-2xl font-bold">설정</Text>

      <View className="mt-6">
        {settingItems.map((item, idx) => (
          <View key={idx} className="mt-4">
            <Pressable className="w-full rounded-md p-3 bg-gray-300">
              <Text className="text-center text-gray-700">{item.label}</Text>
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Settings;
