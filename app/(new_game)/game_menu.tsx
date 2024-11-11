import { View, Text, Pressable } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";

import { StatusBar } from "expo-status-bar";

export default function GameMenu() {
  const router = useRouter();

  // Navigation
  const navigation = useNavigation();

  function viewRoles() {
    router.push({
      pathname: "/roles_modal",
      params: { darkMode: "true" },
    });
  }

  function startNewGame() {
    router.replace("/new_game");
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
    <View className="flex-1 bg-slate-900 items-center justify-center p-5">
      <StatusBar style={"light"} />

      <Text className="text-2xl text-white font-bold">Werewolf:</Text>
      <Text className="text-2xl text-white font-bold mb-4">
        Save the Village
      </Text>
      <Text className="text-lg text-white text-center mb-8 font-light w-[90%]">
        Duration:
      </Text>

      <View className="justify-center w-[80%] gap-y-3">
        <View className="bg-green-200 p-4 rounded-xl">
          <Text className="font-bold text-center mb-3">Game Information </Text>
          <Text className="font-bold text-start">Players: </Text>
          <Text className="font-bold text-start">Game Duration: </Text>
        </View>
        <Pressable
          onPress={startNewGame}
          className="bg-green-300 p-4 rounded-xl"
        >
          <Text className="font-bold text-center">New Game</Text>
        </Pressable>

        <Pressable onPress={viewRoles} className="bg-green-300 p-4 rounded-xl">
          <Text className="font-bold text-center">View Roles</Text>
        </Pressable>

        <Pressable onPress={exitMenu} className="bg-green-300 p-4 rounded-xl">
          <Text className="font-bold text-center">Exit Game</Text>
        </Pressable>

        <Pressable
          onPress={goBack}
          className="bg-slate-200 p-4 rounded-xl border border-gray-400"
        >
          <Text className="font-bold text-center">Go Back</Text>
        </Pressable>
      </View>
    </View>
  );
}
