import { View, Text, Pressable } from "react-native";
import React, { useEffect } from "react";
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function GameMenu() {
  const router = useRouter();
  const { darkMode } = useLocalSearchParams();

  console.log("darkMode:", darkMode);

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
    router.replace("/");
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
        Werewolf:
      </Text>
      <Text
        style={{
          fontFamily: "Bronzetti_SC_Condensed",
          fontSize: 26,
          color: isDarkMode ? "gray" : "black",
        }}
        className="text-[24px] font-bold"
      >
        Save the Village
      </Text>

      <View
        className={`seperator my-6 h-[1px] w-[60%] ${
          isDarkMode ? "bg-slate-400" : "bg-gray-300"
        }`}
      />

      <View className="justify-center w-[60%] gap-y-3">
        <Pressable
          className={`p-4 rounded-xl ${
            isDarkMode ? "bg-green-600" : "bg-green-300"
          }`}
        >
          <Text
            className={`font-bold text-center ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            Game Info
          </Text>
        </Pressable>

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
            View Roles
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
            Quit Game
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
            Go Back
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
