import { View, Text, Pressable } from "react-native";
import React, { useContext, useEffect } from "react";
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import SoundContext from "@/contexts/SoundContext";
import { useTranslation } from "react-i18next";

export default function GameMenu() {
  const router = useRouter();
  const { darkMode } = useLocalSearchParams();

  const { t } = useTranslation();

  const {
    setNightSoundsEnabled,
    setDaySoundsEnabled,
    setWinSoundEnabled,
    setSoundtrackEnabled,
  } = useContext(SoundContext)!;

  // Converting the string from params into a boolean
  let isDarkMode = null;
  if (darkMode === "true") isDarkMode = true;
  else isDarkMode = false;

  console.log("isDarkMode:", isDarkMode);

  // Navigation
  const navigation = useNavigation();

  function viewRoles() {
    router.push({
      pathname: "/roles_modal",
      params: { darkMode },
    });
  }

  const exitMenu = () => {
    setNightSoundsEnabled(false);
    setDaySoundsEnabled(false);
    setWinSoundEnabled(false);

    // Start back up the soundtrack
    setSoundtrackEnabled(true);

    router.replace("/main");
  };

  const goBack = () => {
    router.back();
  };

  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
      console.log("onback");

      navigation.dispatch(e.data.action);
    });
  }, []);

  return (
    <View
      className={`flex-1 items-center justify-center p-5 ${
        isDarkMode ? "bg-slate-900" : "bg-white"
      }`}
    >
      <StatusBar style={isDarkMode ? "light" : "dark"} />

      <Text
        style={{
          fontFamily: "Bronzetti_SC_Condensed",
          fontSize: 34,
          color: isDarkMode ? "lightgray" : "black",
        }}
        className="text-[24px] font-bold my-1"
      >
        {t("title")}
      </Text>
      <Text
        style={{
          fontFamily: "Bronzetti_SC_Condensed",
          fontSize: 26,
          color: isDarkMode ? "gray" : "black",
        }}
        className="text-[24px] font-bold"
      >
        {t("subtitle")}
      </Text>

      <View
        className={`seperator my-6 h-[1px] w-[60%] ${
          isDarkMode ? "bg-slate-400" : "bg-gray-300"
        }`}
      />

      <View className="justify-center w-[60%] gap-y-3">
        <Pressable
          onPress={viewRoles}
          className={`p-4 rounded-xl ${
            isDarkMode ? "bg-green-600" : "bg-green-300"
          }`}
        >
          <Text
            className={`font-bold text-center ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            {t("viewRolesScreen.viewRolesButton")}
          </Text>
        </Pressable>

        <Pressable
          onPress={exitMenu}
          className={`p-4 rounded-xl ${
            isDarkMode ? "bg-green-600" : "bg-green-300"
          }`}
        >
          <Text
            className={`font-bold text-center ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            {t("gameMenu.quitGame")}
          </Text>
        </Pressable>

        <Pressable
          onPress={goBack}
          className={`p-4 rounded-xl border ${
            isDarkMode
              ? "bg-slate-700 border-gray-500"
              : "bg-slate-200 border-gray-400"
          }`}
        >
          <Text
            className={`font-bold text-center ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            {t("gameMenu.goBack")}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
