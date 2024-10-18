import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

interface Item {
  order: number;
  name: string;
  link: string;
  role: string;
}

export default function OperatorViewRoles() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { players_roles } = params;

  const [rolesShown, setRolesShown] = useState<boolean>(false);

  // Parse the allPlayersInGame array from JSON
  const allPlayersInGame: Item[] = players_roles
    ? JSON.parse(players_roles as string)
    : [];

  function showAllRoles() {
    setRolesShown(true);
  }

  function toFirstNight() {
    router.push({
      pathname: "/night_time",
    });
  }

  return (
    <SafeAreaView className="flex-1 h-[100%]">
      {/* Header Image */}
      <View className="items-center justify-center mt-8">
        <Image
          className="h-48 w-48"
          source={require("../../assets/images/new_game/zzz.png")}
        />
      </View>

      {/* Heading Text */}
      <Text className="text-center font-bold text-[20px] py-4">
        Get Ready for the First Night
      </Text>
      <Text className="text-center font-light text-[15px] px-10">
        As the operator, you will get the village ready for their first night.
        View each player's role below.
      </Text>

      {/* Table Header with vertical separator */}
      <View className="flex-row items-center bg-slate-200 m-5 p-4 rounded-2xl">
        <Text className="font-bold text-left flex-1">Player:</Text>
        <View className="w-[0px] bg-gray-500 h-full mx-4" />
        <Text className="font-bold text-left flex-1">Role:</Text>
      </View>

      {rolesShown ? (
        // Table Content: Players' roles
        <ScrollView
          className="flex-1 px-5 mb-20"
          showsVerticalScrollIndicator={false}
        >
          {allPlayersInGame.map((player, index) => (
            <View
              key={index}
              className={`flex-row items-center py-2 px-4 ${
                index % 2 === 0 ? "bg-slate-100" : "bg-slate-200"
              } rounded-lg mb-2`}
            >
              <Text className="text-left flex-1">
                {player.order}. {player.name}
              </Text>
              <View className="w-[0px] bg-gray-400 h-full mx-4" />
              <Text className="text-left flex-1">{player.role}</Text>
            </View>
          ))}
        </ScrollView>
      ) : (
        // View Roles Button
        <View className="">
          <TouchableOpacity
            className="mx-5 p-3 bg-blue-700 rounded-xl w-[40%] shadow-md"
            onPress={showAllRoles}
          >
            <Text className="text-center text-white">View Roles</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Continue Button */}
      <View className="continue-button w-[100%] items-center absolute bottom-10">
        <TouchableOpacity
          onPress={toFirstNight}
          className="bg-slate-300 items-center justify-center p-4 w-[90%] rounded-xl z-10"
        >
          <Text className="text-[16px] font-bold">Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
