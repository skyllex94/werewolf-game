import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useContext, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { assignRolesToPlayers } from "@/functions/functions";
import { showMessage } from "react-native-flash-message";
import NewGameContext from "@/contexts/NewGameContext";
import { useTranslation } from "react-i18next";

export default function IntroScanScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams();

  const { characters_data, players_names } = params;
  const { allPlayersInGame, setAllPlayersInGame, setPlayersInGame } =
    useContext(NewGameContext);

  useEffect(() => {
    try {
      const characters = JSON.parse(characters_data as string);
      const playersNames: string[] = players_names
        ? JSON.parse(players_names as string)
        : [];

      if (characters.length === 0 || playersNames.length === 0) {
        console.log("Error: Missing characters or players' names");
        return;
      }

      const rolesAssigned = assignRolesToPlayers(characters, playersNames);
      setAllPlayersInGame(rolesAssigned);
      setPlayersInGame(rolesAssigned);
    } catch (err) {
      console.error("Error while assigning the roles to players: ", err);
      showMessage({
        message: `Error while assigning the roles to players: ${err}`,
        type: "danger",
        backgroundColor: "#d9534f",
      });
    }
  }, [characters_data, players_names]);

  function showPlayersCodes() {
    try {
      if (allPlayersInGame.length > 0) {
        router.push({
          pathname: "/players_scans",
          params: {
            players_roles: JSON.stringify(allPlayersInGame),
          },
        });
      } else {
        console.log("No player roles available.");
      }
    } catch (err) {
      console.log("Error in the scanning introduction: ", err);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <View className="items-center justify-center mx-3">
        <Text className="text-center font-bold text-[20px] text-white py-4">
          {t("scanningIntroductionScreen.title")}
        </Text>
        <View className="seperator bg-slate-700 my-5 h-[1px] w-[70%]" />
        <View className="h-[250px] w-[250px] items-center justify-center rounded-full px-2 bg-slate-300">
          <Image
            className="w-[60%] h-72 rounded-full"
            source={require("../../assets/images/new_game/scan-intro.png")}
          />
        </View>
      </View>

      <View className="flex-4 mx-5 mt-4">
        <Text className="font-light my-2 w-[100%] text-gray-200">
          {t("scanningIntroductionScreen.firstMessage")}
        </Text>

        <Text className="font-light w-[100%] text-gray-200">
          {t("scanningIntroductionScreen.secondMessage")}
        </Text>
      </View>

      <View className="continue-button w-[100%] items-center absolute bottom-10">
        <TouchableOpacity
          onPress={showPlayersCodes}
          className="bg-gray-700 items-center justify-center p-4 w-[90%] rounded-xl z-10"
          activeOpacity={0.85}
        >
          <Text className="text-[16px] font-bold text-white">
            {t("scanningIntroductionScreen.showCodes")}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
