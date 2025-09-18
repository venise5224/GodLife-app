import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { View } from "react-native";

export default function TabsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <View className="flex-1">
      <Header />

      <View className="flex-1">{children}</View>

      <Footer />
    </View>
  );
}
