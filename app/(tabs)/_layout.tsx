import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { View } from "react-native";

export default function TabsLayout() {
  return (
    <View className="flex flex-col h-full">
      <Header />
      <main className="flex-1">메인 콘텐츠 영역</main>
      <Footer />
    </View>
  );
}
