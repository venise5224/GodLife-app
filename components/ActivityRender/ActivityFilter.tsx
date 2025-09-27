import { Pressable, Text, View } from "react-native";

interface Props {
  filter: "All" | "Plan" | "Log";
  onChange: (activitySource: "All" | "Plan" | "Log") => void;
}

const ActivityFilter = ({ filter, onChange }: Props) => {
  return (
    <View className="flex-row gap-2 mb-2">
      {(["All", "Plan", "Log"] as const).map((activitySource) => (
        <Pressable
          key={activitySource}
          onPress={() => onChange(activitySource)}
          className={`px-3 py-1 rounded-full border text-xs
            ${
              filter === activitySource
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-600 border-gray-300"
            }`}
        >
          <Text className="text-xs">{activitySource}</Text>
        </Pressable>
      ))}
    </View>
  );
};

export default ActivityFilter;
