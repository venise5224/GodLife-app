import { Link } from "expo-router";
import { BarChart, Home, Settings } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";

export default function Footer() {
  return (
    <View className="flex-row justify-around p-4 border-t border-gray-200 bg-white">
      <Link href="/" asChild>
        <TouchableOpacity>
          <Home color="blue" size={28} />
        </TouchableOpacity>
      </Link>

      <Link href="/stats" asChild>
        <TouchableOpacity>
          <BarChart color="orange" size={28} />
        </TouchableOpacity>
      </Link>

      <Link href="/settings" asChild>
        <TouchableOpacity>
          <Settings color="gray" size={28} />
        </TouchableOpacity>
      </Link>
    </View>
  );
}
