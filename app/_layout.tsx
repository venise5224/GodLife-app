import { Stack } from "expo-router";
import { View } from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import "./global.css";

const RootLayout = () => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, paddingBottom: insets.bottom }}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>
    </SafeAreaProvider>
  );
};

export default RootLayout;
