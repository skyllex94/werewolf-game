import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function MainMenu() {
  const menuItems = [
    {
      name: "New Game",
      icon: <Entypo name="plus" size={18} color="black" />,
      link: "/new_game",
    },

    {
      name: "Characters",
      icon: null,
    },
    {
      name: "Rules",
      icon: null,
    },
    {
      name: "Go Pro",
      icon: null,
    },
    {
      name: "Settings",
      icon: null,
    },
  ];

  return (
    <View className="items-center w-[100%] gap-y-1">
      {menuItems.map((item, idx) => (
        <Link key={idx} href={`${item.link}`} asChild>
          <TouchableOpacity
            className="flex-row items-center justify-center bg-slate-200 p-3 w-[50%] rounded-lg"
            onPress={() => console.log(item.name)}
          >
            {item.icon}
            <Text className="text-center">{item.name}</Text>
          </TouchableOpacity>
        </Link>
      ))}
    </View>
  );
}
