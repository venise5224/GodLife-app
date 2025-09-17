import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Tabs } from "expo-router";
import { View } from "react-native";

export default function TabsLayout() {
  return (
    <View className="flex-1">
      <Header />

      <View className="flex-1">
        <Tabs screenOptions={{ headerShown: false }}>
          <Tabs.Screen name="index" options={{ title: "홈" }} />
          <Tabs.Screen name="stats" options={{ title: "통계" }} />
          <Tabs.Screen name="settings" options={{ title: "설정" }} />
        </Tabs>
      </View>

      <Footer />
    </View>
  );
}
