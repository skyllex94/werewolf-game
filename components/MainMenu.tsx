import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { Link, Href } from "expo-router";

export default function MainMenu() {
  const menuItems = [
    {
      name: "New Game",
      icon: <Entypo name="plus" size={18} color="black" />,
      link: "/new_game",
    },
    {
      name: "Winner",
      icon: null,
      link: "/game_winner",
    },
    {
      name: "Rules",
      icon: null,
      link: null,
    },
    {
      name: "Go Pro",
      icon: null,
      link: null,
    },
    {
      name: "Settings",
      icon: null,
      link: null,
    },
  ];

  return (
    <View className="items-center w-[100%] gap-y-1">
      {menuItems.map((item, idx) =>
        item.link ? (
          <Link key={idx} href={item.link as Href} asChild>
            <TouchableOpacity
              className="flex-row items-center justify-center bg-slate-200 p-3 w-[50%] rounded-lg"
              onPress={() => console.log(item.name)}
            >
              {item.icon}
              <Text
                // style={{ fontFamily: "Bronzetti_Condensed", fontSize: 18 }}
                className="text-center"
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          </Link>
        ) : (
          <TouchableOpacity
            key={idx}
            className="flex-row items-center justify-center bg-slate-200 p-3 w-[50%] rounded-lg"
            onPress={() => {}}
          >
            {item.icon}
            <Text
              // style={{ fontFamily: "Bronzetti_Condensed", fontSize: 14 }}
              className="text-center"
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )
      )}
    </View>
  );
}
