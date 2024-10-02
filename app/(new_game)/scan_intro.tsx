import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { shuffleArray } from "@/functions/functions";
import { showMessage } from "react-native-flash-message";

export default function IntroScanScreen() {
  const params = useLocalSearchParams();
  const { characters_data, players_names } = params;

  // Params incoming data format and type

  // players_names - ["Lilly", "Michael", "Lucy", "Mary", "Nige", "Garf"] - string
  // characters_data - [{"type":"Villager","amount":3},{"type":"Werewolf","amount":1},
  //  {"type":"Seer","amount":1},{"type":"Doctor","amount":1}] - string

  // First, log the raw data and its types
  console.log("Raw characters_data:", characters_data, typeof characters_data);
  console.log("Raw players_names:", players_names, typeof players_names);

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
    const playersRoles = assignRolesToPlayers(characters, playersNames);
    console.log("Assigned Player Roles:", playersRoles);
  } catch (err) {
    console.error("Error while assigning the roles to players: ", err);
    showMessage({
      message: `Error while assigning the roles to players: ${err}`,
      type: "danger",
    });
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="items-center justify-center mx-3">
        <Text className="text-center font-bold text-[20px] py-4">
          Begin Game
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
          onPress={() => {}}
          className="bg-slate-300 items-center justify-center p-4 w-[90%] rounded-xl z-10"
        >
          <Text className="text-[16px] font-bold">Show Codes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// Function to randomly assign roles to players
function assignRolesToPlayers(characters: any[], playersNames: string[]) {
  console.log("characters:", characters, typeof characters);
  console.log("playersNames:", playersNames, typeof characters);

  // Create a pool of character types based on the `amount` for each type
  let characterPool: string[] = [];

  // Ensure characters is a valid array
  characters.forEach((character: { type: string; amount: number }) => {
    for (let i = 0; i < character.amount; i++) {
      characterPool.push(character.type);
    }
  });

  // Shuffle the pool to randomize the assignment
  characterPool = shuffleArray(characterPool);

  // Map each player to a character type from the shuffled pool
  const playerRoles = playersNames.map((player: string, idx: number) => ({
    player,
    role: characterPool[idx],
  }));

  return playerRoles;
}
