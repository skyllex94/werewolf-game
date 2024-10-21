import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useContext, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { assignRolesToPlayers } from "@/functions/functions";
import { showMessage } from "react-native-flash-message";
import NewGameContext from "@/contexts/NewGameContext";

export default function IntroScanScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const { characters_data, players_names } = params;
  const { allPlayersInGame, setAllPlayersInGame, setPlayersLeft } =
    useContext(NewGameContext);

  // players_names - ["Lilly", "Michael", "Lucy", "Mary", "Nige", "Garf"] - string
  // characters_data - [{"type":"Villager","amount":3},{"type":"Werewolf","amount":1},
  //  {"type":"Seer","amount":1},{"type":"Doctor","amount":1}] - string

  useEffect(() => {
    // Prepare and execute assigning roles to players
    try {
      // Parse characters_data into an array of objects
      const characters = JSON.parse(characters_data as string);

      // Parse players_names
      const playersNames: string[] = players_names
        ? JSON.parse(players_names as string)
        : [];

      // Ensure no empty or invalid inputs
      if (characters.length === 0 || playersNames.length === 0) {
        console.log("Error: Missing characters or players' names");
        return;
      }

      // Assign random roles to each player
      const rolesAssigned = assignRolesToPlayers(characters, playersNames);

      // Initially the players left is the same as allPlayersInGame
      setAllPlayersInGame(rolesAssigned);
      setPlayersLeft(rolesAssigned);
    } catch (err) {
      console.error("Error while assigning the roles to players: ", err);
      showMessage({
        message: `Error while assigning the roles to players: ${err}`,
        type: "danger",
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

      {/*
      <BarcodeCreatorView
        value={"Hello World"}
        background={"#FFFFFF"}
        foregroundColor={"#000000"}
        format={BarcodeFormat.AZTEC}
        style={styles.box}
      />
      */}

      <View className="flex-4 mx-5">
        <Text className="font-light my-2 w-[100%]">
          On the next screens the <Text className="font-bold">narrator</Text> of
          the game should individually{" "}
          <Text className="font-bold">present a scan code</Text> to each one of
          the players.
        </Text>

        <Text className="font-light w-[100%]">
          With it, the players will be able to{" "}
          <Text className="font-bold">individually view</Text> their roles in
          the game, among with further explanations to them if needed.
        </Text>
      </View>

      <View className="continue-button w-[100%] items-center absolute bottom-10">
        <TouchableOpacity
          onPress={showPlayersCodes}
          className="bg-slate-300 items-center justify-center p-4 w-[90%] rounded-xl z-10"
        >
          <Text className="text-[16px] font-bold">Show Codes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
