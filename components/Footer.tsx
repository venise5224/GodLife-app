import { Link } from "expo-router";
import { BarChart, Home, Settings } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

export default function Footer() {
  return (
    <View className="flex-row justify-around p-4 border-t border-gray-200 bg-white">
      <Link href="/" asChild>
        <TouchableOpacity>
          <Text>
            <Home color="blue" size={28} />
          </Text>
        </TouchableOpacity>
      </Link>

      <Link href="/stats" asChild>
        <TouchableOpacity>
          <Text>
            <BarChart color="orange" size={28} />
          </Text>
        </TouchableOpacity>
      </Link>

      <Link href="/settings" asChild>
        <TouchableOpacity>
          <Text>
            <Settings color="gray" size={28} />
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
