import { Text, View } from "react-native";

const ListHeader = () => {
  const menuList = [
    { id: 1, name: "이름", className: "w-[50px]" },
    { id: 2, name: "Source", className: "w-[50px] text-center" },
    { id: 3, name: "시작", className: "w-[60px] text-center" },
    { id: 4, name: "종료", className: "w-[60px] text-center" },
    { id: 5, name: "소요 시간", className: "w-[60px] text-center" },
    { id: 6, name: "삭제", className: "w-[20px]" },
  ];

  return (
    <View className="flex-row p-2 text-xs text-gray-500 border-b">
      {menuList.map((menu) => (
        <Text key={menu.id} className={`font-bold text-xs ${menu.className}`}>
          {menu.name}
        </Text>
      ))}
    </View>
  );
};

export default ListHeader;
