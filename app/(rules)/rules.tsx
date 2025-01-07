import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useRouter, Href } from "expo-router";
import RulesTopPane from "@/components/Rules/RulesTopPane";
import {
  Entypo,
  FontAwesome,
  FontAwesome6,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

type NavigationItem = {
  title: string;
  icon: JSX.Element;
  route: Href;
};

const navigationData: NavigationItem[] = [
  {
    title: "Basic Overview",
    icon: <FontAwesome name="gamepad" size={20} color="white" />,
    route: "/basic_overview",
  },
  {
    title: "Game Setup",
    icon: <MaterialIcons name="dataset-linked" size={20} color="white" />,
    route: "/game_setup",
  },
  {
    title: "Game Phases",
    icon: (
      <MaterialCommunityIcons
        name="numeric-1-box-multiple"
        size={20}
        color="white"
      />
    ),
    route: "/game_phases",
  },
  {
    title: "Elimination Rules",
    icon: <Entypo name="remove-user" size={20} color="white" />,
    route: "/elimination_rules",
  },
  {
    title: "Winning Conditions",
    icon: <FontAwesome name="trophy" size={20} color="white" />,
    route: "/winning_conditions",
  },
  {
    title: "Special Situations",
    icon: <FontAwesome6 name="users-gear" size={20} color="white" />,
    route: "/special_situations",
  },
];

const RulesMenu = () => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <StatusBar style="light" />
      <RulesTopPane iconColor="white" />

      <View className="p-5 bg-gray-900">
        <Text className="text-xl font-bold text-center text-white mb-5">
          {t("rulesScreen.title")}
        </Text>

        {navigationData.map((item, index) => (
          <TouchableOpacity
            key={index}
            className="flex-row items-center p-3 mb-2 bg-gray-800 rounded-lg"
            onPress={() => router.push(item.route)}
          >
            {item.icon}
            <Text className="text-sm text-gray-300 ml-3">{t(item.title)}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default RulesMenu;
