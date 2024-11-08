import React from "react";
import { Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "@/components/Themed";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import RulesTopPane from "@/components/Rules/RulesTopPane";
import { ScrollView } from "react-native-gesture-handler";

const RolesAbilitiesMenu = () => {
  const roles = [
    {
      name: "Villager",
      path: "/villager",
      icon: require("../../assets/images/characters/villager.jpeg"),
    },
    {
      name: "Werewolf",
      path: "/werewolf",
      icon: require("../../assets/images/characters/werewolf.jpeg"),
    },
    {
      name: "Seer",
      path: "/seer",
      icon: require("../../assets/images/characters/seer.jpeg"),
    },
    {
      name: "Doctor",
      path: "/doctor",
      icon: require("../../assets/images/characters/doctor.jpg"),
    },
    {
      name: "Tanner",
      path: "/tanner",
      icon: require("../../assets/images/characters/lurker3.jpeg"),
    },
    {
      name: "Cupid",
      path: "/cupid",
      icon: require("../../assets/images/characters/cupid.jpeg"),
    },
    {
      name: "Prince",
      path: "/prince",
      icon: require("../../assets/images/characters/prince.jpeg"),
    },
    {
      name: "Bodyguard",
      path: "/bodyguard",
      icon: require("../../assets/images/characters/bodyguard.jpeg"),
    },
    {
      name: "Cursed Villager",
      path: "/cursed_villager",
      icon: require("../../assets/images/characters/cursed-villager.jpeg"),
    },
    {
      name: "Priest",
      path: "/priest",
      icon: require("../../assets/images/characters/priest.jpg"),
    },
    {
      name: "Hunter",
      path: "/hunter",
      icon: require("../../assets/images/characters/hunter.jpg"),
    },
    {
      name: "Lycan",
      path: "/lycan",
      icon: require("../../assets/images/characters/lycan.jpeg"),
    },
    {
      name: "Witch",
      path: "/witch",
      icon: require("../../assets/images/characters/witch.jpeg"),
    },
    {
      name: "Alpha Werewolf",
      path: "/alpha_werewolf",
      icon: require("../../assets/images/characters/alpha-werewolf.jpg"),
    },
    {
      name: "Wolf Cub",
      path: "/wolf_cub",
      icon: require("../../assets/images/characters/wolf-cub.jpeg"),
    },
  ];

  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <StatusBar style="light" />
      <RulesTopPane iconColor="white" />

      <ScrollView className="p-5 bg-gray-900">
        <Text className="text-xl font-bold text-center text-white mb-5">
          Roles & Abilities
        </Text>

        {roles.map((role) => (
          <TouchableOpacity
            key={role.name}
            className="p-3 mb-2 bg-gray-800 rounded-lg flex-row items-center"
            onPress={() => router.push({ pathname: role.path as any })}
          >
            <Image
              source={role.icon}
              style={{
                width: 25,
                height: 25,
                marginRight: 10,
                borderRadius: 5,
              }}
            />
            <Text className="text-sm text-gray-300">{role.name}</Text>
          </TouchableOpacity>
        ))}
        <View className="bottom spacing m-4" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default RolesAbilitiesMenu;
