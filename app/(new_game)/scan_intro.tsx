import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";

export default function scan_intro() {
  const params = useLocalSearchParams();
  const { total_players, characters_data } = params;

  console.log("characters_data:", characters_data);
  console.log("total_players:", total_players);

  return (
    <SafeAreaView className="flex-1">
      <View className="items-center justify-center mx-3">
        <Text className="text-center font-bold text-[20px] py-4">
          Scanning Introduction
        </Text>
        <View className="seperator bg-slate-200 my-5 h-[1px] w-[80%]" />

        <Image
          className="w-[80%] h-72 rounded-xl"
          source={require("../../assets/images/new_game/scan-intro.png")}
        />
      </View>

      <View className="flex-4 mx-5">
        <Text className="font-light my-2 w-[100%]">
          On the next screens the <Text className="font-bold">narrator</Text> of
          the game should individually present a scan code to each one of the{" "}
          <Text className="font-bold">players.</Text>
        </Text>

        <Text className="font-light w-[100%]">
          With it, the players will be able to{" "}
          <Text className="font-bold">individually view</Text> their roles in
          the game, among with further explanations to them if needed.
        </Text>
      </View>

      <View className="continue-button w-[100%] items-center absolute bottom-10">
        <TouchableOpacity
          onPress={() => {}}
          className="bg-slate-300 items-center justify-center p-4 w-[90%] rounded-xl z-10"
        >
          <Text className="text-[16px] font-bold">Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
