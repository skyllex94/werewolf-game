import React from "react";
import { Text, TouchableOpacity, Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import RulesTopPane from "@/components/Rules/RulesTopPane";
import { ScrollView } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";

const RolesAbilitiesMenu = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const roles = [
    {
      nameKey: "newGameScreen.roles.villager",
      path: "/villager",
      icon: require("../../assets/images/characters/villager.jpeg"),
    },
    {
      nameKey: "newGameScreen.roles.werewolf",
      path: "/werewolf",
      icon: require("../../assets/images/characters/werewolf.jpeg"),
    },
    {
      nameKey: "newGameScreen.roles.seer",
      path: "/seer",
      icon: require("../../assets/images/characters/seer.jpeg"),
    },
    {
      nameKey: "newGameScreen.roles.doctor",
      path: "/doctor",
      icon: require("../../assets/images/characters/doctor.jpg"),
    },
    {
      nameKey: "newGameScreen.roles.tanner",
      path: "/tanner",
      icon: require("../../assets/images/characters/lurker3.jpeg"),
    },
    {
      nameKey: "newGameScreen.roles.cupid",
      path: "/cupid",
      icon: require("../../assets/images/characters/cupid.jpeg"),
    },
    {
      nameKey: "newGameScreen.roles.prince",
      path: "/prince",
      icon: require("../../assets/images/characters/prince.jpeg"),
    },
    {
      nameKey: "newGameScreen.roles.bodyguard",
      path: "/bodyguard",
      icon: require("../../assets/images/characters/bodyguard.jpeg"),
    },
    {
      nameKey: "newGameScreen.roles.cursedVillager",
      path: "/cursed_villager",
      icon: require("../../assets/images/characters/cursed-villager.jpeg"),
    },
    {
      nameKey: "newGameScreen.roles.priest",
      path: "/priest",
      icon: require("../../assets/images/characters/priest.jpg"),
    },
    {
      nameKey: "newGameScreen.roles.hunter",
      path: "/hunter",
      icon: require("../../assets/images/characters/hunter.jpg"),
    },
    {
      nameKey: "newGameScreen.roles.lycan",
      path: "/lycan",
      icon: require("../../assets/images/characters/lycan.jpeg"),
    },
    {
      nameKey: "newGameScreen.roles.witch",
      path: "/witch",
      icon: require("../../assets/images/characters/witch.jpeg"),
    },
    {
      nameKey: "newGameScreen.roles.alphaWerewolf",
      path: "/alpha_werewolf",
      icon: require("../../assets/images/characters/alpha-werewolf.jpg"),
    },
    {
      nameKey: "newGameScreen.roles.wolfCub",
      path: "/wolf_cub",
      icon: require("../../assets/images/characters/wolf-cub.jpeg"),
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <StatusBar style="light" />
      <RulesTopPane iconColor="white" />

      <ScrollView className="p-5 bg-gray-900">
        <Text className="text-xl font-bold text-center text-white mb-5">
          {t("rolesScreen.rolesAbilitiesTitle")}
        </Text>

        {roles.map((role) => (
          <TouchableOpacity
            key={role.nameKey}
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
            <Text className="text-sm text-gray-300">{t(role.nameKey)}</Text>
          </TouchableOpacity>
        ))}
        <View className="bottom spacing m-4" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default RolesAbilitiesMenu;
