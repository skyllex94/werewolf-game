import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import {
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Link, Href } from "expo-router";

export default function MainMenu() {
  const menuItems = [
    {
      name: "New Game",
      icon: (
        <Image
          className="w-[18px] h-[18px]"
          style={{ tintColor: "white" }}
          source={require("../assets/images/bottom_sheet/werewolf.png")}
        />
      ),
      link: "/new_game",
    },

    {
      name: "Game Rules",
      icon: (
        <MaterialCommunityIcons
          name="ruler-square-compass"
          size={18}
          color="white"
        />
      ),
      link: "/rules",
    },
    {
      name: "Roles & Abilities",
      icon: <Entypo name="users" size={15} color="white" />,
      link: "/roles",
    },
    {
      name: "Go Pro",
      icon: <MaterialIcons name="workspace-premium" size={18} color="white" />,
      link: null,
    },
    {
      name: "Settings",
      icon: <Ionicons name="settings" size={16} color="white" />,
      link: "/settings",
    },
  ];

  return (
    <View className="items-center w-[100%] gap-y-1">
      {menuItems.map((item, idx) =>
        item.link ? (
          <Link key={idx} href={item.link as Href} asChild>
            <TouchableOpacity
              className="flex-row justify-start bg-gray-800 py-3 pl-6 w-[50%] rounded-lg"
              onPress={() => console.log(item.name)}
            >
              {item.icon}
              <Text
                // style={{ fontFamily: "Bronzetti_Condensed", fontSize: 18 }}
                className="mx-1 text-center text-white"
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          </Link>
        ) : (
          <TouchableOpacity
            key={idx}
            className="flex-row justify-start bg-gray-800 py-3 pl-6 w-[50%] rounded-lg"
            onPress={() => {}}
          >
            {item.icon}
            <Text className="mx-1 text-center text-white">{item.name}</Text>
          </TouchableOpacity>
        )
      )}
    </View>
  );
}
