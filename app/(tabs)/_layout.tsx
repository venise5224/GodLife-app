import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { Slot } from "expo-router";
import { View } from "react-native";

const TabsLayout = () => {
  return (
    <View className="flex-1">
      <Header />

      <View className="flex-1">
        <Slot /> {/* 현재 페이지 */}
      </View>

      <Footer />
    </View>
  );
};

export default TabsLayout;
