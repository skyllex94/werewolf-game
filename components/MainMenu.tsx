import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import {
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Link, Href } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function MainMenu() {
  const menuItems = [
    {
      name: "New Game",
      icon: (
        <Image
          className="w-[18px] h-[18px]"
          style={{ tintColor: "black" }}
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
          color="black"
        />
      ),
      link: "/rules",
    },
    {
      name: "Roles & Abilities",
      icon: <Entypo name="users" size={15} color="black" />,
      link: "/roles",
    },
    {
      name: "Go Pro",
      icon: <MaterialIcons name="workspace-premium" size={18} color="black" />,
      link: "/shared/paywall",
    },
    {
      name: "Settings",
      icon: <Ionicons name="settings" size={16} color="black" />,
      link: "/settings",
    },
  ];

  return (
    <View className="items-center w-[100%] gap-y-1 mb-4">
      {menuItems.map((item, idx) => (
        <LinearGradient
          key={idx}
          className="flex-row justify-start items-center rounded-lg"
          colors={["#3EB489", "#90EE90"]}
          start={[0, 0]}
          end={[1, 1]}
        >
          <Link key={idx} href={item.link as Href} asChild>
            <TouchableOpacity className="flex-row justify-start p-3 pl-6 w-[65%] rounded-lg">
              {item.icon}

              <Text className="mx-1 text-center">{item.name}</Text>
            </TouchableOpacity>
          </Link>
        </LinearGradient>
      ))}
    </View>
  );
}
