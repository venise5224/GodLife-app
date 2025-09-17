import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Header() {
  return (
    <View className="flex justify-between items-center px-4 py-2 bg-white border-b border-gray-200">
      {/* 로고 */}
      <Link href="/" asChild>
        <TouchableOpacity>GodLife</TouchableOpacity>
      </Link>

      {/* 현재 날짜 */}
      <View>
        <Text className="text-xs font-bold border-2 px-3 py-1 rounded-lg">
          {new Date().toLocaleDateString()}
        </Text>
      </View>
    </View>
  );
}
