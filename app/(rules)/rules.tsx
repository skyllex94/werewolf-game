import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import RulesTopPane from "@/components/Rules/RulesTopPane";

const RulesMenu = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <StatusBar style={"light"} />
      <RulesTopPane iconColor="white" />

      <View className="p-5 bg-gray-900">
        <Text className="text-xl font-bold text-center text-white mb-5">
          Game Rules
        </Text>

        {/* Basic Overview */}
        <TouchableOpacity
          className="p-3 mb-2 bg-gray-800 rounded-lg"
          onPress={() =>
            router.push({
              pathname: "/basic_overview",
            })
          }
        >
          <Text className="text-sm text-gray-300">Basic Overview</Text>
        </TouchableOpacity>

        {/* Game Setup */}
        <TouchableOpacity
          className="p-3 mb-2 bg-gray-800 rounded-lg"
          onPress={() => router.push("/game_setup")}
        >
          <Text className="text-sm text-gray-300">Game Setup</Text>
        </TouchableOpacity>

        {/* Game Phases */}
        <TouchableOpacity
          className="p-3 mb-2 bg-gray-800 rounded-lg"
          onPress={() => router.push("/game_phases")}
        >
          <Text className="text-sm text-gray-300">Game Phases</Text>
        </TouchableOpacity>

        {/* Elimination Rules */}
        <TouchableOpacity
          className="p-3 mb-2 bg-gray-800 rounded-lg"
          onPress={() => router.push("/elimination_rules")}
        >
          <Text className="text-sm text-gray-300">Elimination Rules</Text>
        </TouchableOpacity>

        {/* Winning Conditions */}
        <TouchableOpacity
          className="p-3 mb-2 bg-gray-800 rounded-lg"
          onPress={() => router.push("/winning_conditions")}
        >
          <Text className="text-sm text-gray-300">Winning Conditions</Text>
        </TouchableOpacity>

        {/* Special Situations */}
        <TouchableOpacity
          className="p-3 mb-2 bg-gray-800 rounded-lg"
          onPress={() => router.push("/special_situations")}
        >
          <Text className="text-sm text-gray-300">Special Situations</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RulesMenu;
