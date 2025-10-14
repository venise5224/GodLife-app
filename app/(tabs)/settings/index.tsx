import { useResetHourStore } from "@/stores/useResetHourStore";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

const Settings = () => {
  const [selectedSetting, setSelectedSetting] = useState<string | null>(null);
  const { resetHour, setResetHour } = useResetHourStore();

  const settingItems = [
    { label: "다크모드" },
    { label: "언어 선택" },
    { label: "초기화 시각 설정", key: "resetHour" },
    { label: "로그아웃" },
  ];

  return (
    <View className="px-4 py-6 max-w-xl w-full self-center">
      <Text className="text-2xl font-bold">설정</Text>

      <View className="mt-6">
        {settingItems.map((item, idx) => (
          <View key={idx} className="mt-4">
            <Pressable
              className="w-full rounded-md p-3 bg-gray-300"
              onPress={() => {
                setSelectedSetting((prev) =>
                  prev === item.key ? null : (item.key ?? null)
                );
              }}
            >
              <Text className="text-center text-gray-700">{item.label}</Text>
            </Pressable>

            {/* 초기화 시각 설정 UI */}
            {item.key === "resetHour" && selectedSetting === "resetHour" && (
              <View className="mt-2 bg-white rounded-md border border-gray-300">
                <Picker
                  selectedValue={resetHour}
                  onValueChange={(value) => setResetHour(value)}
                >
                  {Array.from({ length: 24 }, (_, i) => (
                    <Picker.Item key={i} label={`${i}시`} value={i} />
                  ))}
                </Picker>
              </View>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

export default Settings;
