import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import NewGameContext from "@/contexts/NewGameContext";
import SoundContext from "@/contexts/SoundContext";

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
  const { setSoundtrackEnabled } = useContext(SoundContext)!;

  const {
    setWitchProtectionUsed,
    setConvertedByAlphaWerewolf,
    setCupidBond,
    setUniqueRolesInGame,
  } = useContext(NewGameContext);

  function checkStatesBeforeGame() {
    setConvertedByAlphaWerewolf(null);
    setWitchProtectionUsed(false);
    setCupidBond(false);
  }

  function initUniqueRolesInGame() {
    const uniqueRoles = Array.from(
      new Set(allPlayersInGame.map((player: { role: string }) => player.role))
    );

    const initialRolesState = uniqueRoles.reduce((acc, role) => {
      acc[role] = role === "Villager" || role === "Seer" ? true : false;
      return acc;
    }, {} as { [key: string]: boolean });

    setUniqueRolesInGame(initialRolesState);
  }

  useEffect(() => {
    checkStatesBeforeGame();
  }, []);

  const allPlayersInGame: Item[] = players_roles
    ? JSON.parse(players_roles as string)
    : [];

  function showAllRoles() {
    setRolesShown(true);
  }

  function toFirstNight() {
    // Stop other sounds
    setSoundtrackEnabled(false);

    router.push({
      pathname: "/night_time",
      params: { firstNight: "true" },
    });
  }

  return (
    <SafeAreaView className="flex-1 h-[100%] bg-gray-900">
      {/* Header Image */}
      <View className="items-center justify-center">
        <View className="mt-8 bg-slate-400 w-48 rounded-full">
          <Image
            className="h-48 w-48"
            source={require("../../assets/images/new_game/zzz.png")}
          />
        </View>
      </View>

      {/* Heading Text */}
      <Text className="text-center font-bold text-[20px] py-4 text-white">
        Get Ready for the First Night
      </Text>
      <Text className="text-center font-light text-[15px] px-10 text-gray-300">
        As the operator, you will get the village ready for their first night.
        View each player's role below.
      </Text>

      {/* Table Header with vertical separator */}
      <View className="flex-row items-center bg-gray-600 m-5 p-4 rounded-2xl">
        <Text className="font-bold text-left flex-1 text-gray-200">
          Player:
        </Text>
        <View className="w-[0px] bg-gray-300 h-full mx-4" />
        <Text className="font-bold text-left flex-1 text-gray-200">Role:</Text>
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
                index % 2 === 0 ? "bg-gray-800" : "bg-gray-900"
              } rounded-lg mb-2`}
            >
              <Text className="text-left flex-1 text-gray-200">
                {player.order}. {player.name}
              </Text>
              <View className="w-[0px] bg-gray-600 h-full mx-4" />
              <Text className="text-left flex-1 text-gray-200">
                {player.role}
              </Text>
            </View>
          ))}
        </ScrollView>
      ) : (
        // View Roles Button
        <View className="items-start">
          <TouchableOpacity
            className="mx-5 p-3 bg-blue-600 rounded-xl w-[40%]"
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
          className="bg-slate-700 items-center justify-center p-4 w-[90%] rounded-xl"
        >
          <Text className="text-[16px] font-bold text-white">Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
