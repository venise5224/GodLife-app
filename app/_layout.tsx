import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "./global.css";

const RootLayout = () => (
  <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
    <StatusBar barStyle="light-content" backgroundColor="#000" />
    <Stack screenOptions={{ headerShown: false }} />
  </SafeAreaView>
);

export default RootLayout;
