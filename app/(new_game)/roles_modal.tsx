import React, { useContext } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";
import NewGameContext from "@/contexts/NewGameContext";
import { useTranslation } from "react-i18next";

interface Item {
  order: number;
  name: string;
  link: string;
  role: string;
  role_name: string;
}

export default function ViewRolesModal() {
  const { t } = useTranslation();
  const router = useRouter();
  const { darkMode } = useLocalSearchParams();

  const { allPlayersInGame } = useContext(NewGameContext);
  let isDarkMode = darkMode === "true";

  const bgColor = isDarkMode ? "bg-gray-900" : "bg-white";
  const textColor = isDarkMode ? "text-white" : "text-black";
  const headerBgColor = isDarkMode ? "bg-gray-700" : "bg-slate-200";
  const rowBgColor1 = isDarkMode ? "bg-gray-900" : "bg-slate-100";
  const rowBgColor2 = isDarkMode ? "bg-gray-800" : "bg-slate-200";
  const buttonColor = isDarkMode ? "bg-gray-700" : "bg-slate-300";

  return (
    <SafeAreaView className={`flex-1 h-[100%] ${bgColor}`}>
      {/* Header Image */}
      <View className="items-center justify-center mt-8">
        <FontAwesome5
          name="users"
          size={48}
          color={isDarkMode ? "white" : "black"}
        />
      </View>

      {/* Heading Text */}
      <Text className={`text-center font-bold text-[20px] py-4 ${textColor}`}>
        {t("viewRolesModal.rolesOfPlayers")}
      </Text>

      {/* Table Header with vertical separator */}
      <View
        className={`flex-row items-center ${headerBgColor} m-5 p-4 rounded-2xl`}
      >
        <Text className={`font-bold text-left flex-1 ${textColor}`}>
          {t("viewRolesModal.player")}
        </Text>
        <View
          className={`w-[0px] ${
            isDarkMode ? "bg-gray-500" : "bg-gray-400"
          } h-full mx-4`}
        />
        <Text className={`font-bold text-left flex-1 ${textColor}`}>
          {t("viewRolesModal.role")}
        </Text>
      </View>

      {/* Table Content: Players' roles */}
      <ScrollView
        className="flex-1 px-5 mb-20"
        showsVerticalScrollIndicator={false}
      >
        {allPlayersInGame.map((player: Item, index: number) => (
          <View
            key={index}
            className={`flex-row items-center py-2 px-4 ${
              index % 2 === 0 ? rowBgColor1 : rowBgColor2
            } rounded-lg mb-2`}
          >
            <Text className={`text-left flex-1 ${textColor}`}>
              {player.order}. {player.name}
            </Text>
            <View
              className={`w-[0px] ${
                isDarkMode ? "bg-gray-500" : "bg-gray-400"
              } h-full mx-4`}
            />
            <Text className={`text-left flex-1 ${textColor}`}>
              {player.role_name}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Continue Button */}
      <View className="continue-button w-[100%] items-center absolute bottom-10">
        <TouchableOpacity
          onPress={() => router.back()}
          className={`${buttonColor} items-center justify-center p-4 w-[90%] rounded-xl z-10`}
        >
          <Text className={`text-[16px] font-bold ${textColor}`}>
            {t("viewRolesModal.back")}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
