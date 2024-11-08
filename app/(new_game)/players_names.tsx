import {
  Text,
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { showMessage } from "react-native-flash-message";

export default function PlayersNames() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { total_players, characters_data } = params;

  const players = parseInt(total_players as string);

  const [playerNames, setPlayerNames] = useState<string[]>(
    // Array(players).fill("")

    // Only Placeholders - Remove later *
    ["Kamen", "Mikey", "Rossy"] //"Johnny", "Ponny", "Ronny", "Bonbonny"
  );

  function playerNamesChange(idx: number, text: string) {
    const updatedPlayerNames = [...playerNames];
    updatedPlayerNames[idx] = text;
    setPlayerNames(updatedPlayerNames);
  }

  function confirmPlayers() {
    try {
      // Check if playerNames is valid
      if (!playerNames || playerNames.length === 0) {
        console.log("Player names list is empty or invalid.");
        return;
      }

      // Iterate through player names to check for empty strings
      for (let i = 0; i < playerNames.length; i++) {
        if (!playerNames[i] || playerNames[i].trim() === "") {
          showMessage({
            message: `You have not entered a name for Player ${i + 1}.`,
            type: "danger",
          });
          return;
        }
      }
    } catch (err) {
      console.log("Error while confirming players' names: ", err);
    }

    console.log("All players' names are filled in:", playerNames);

    try {
    } catch (err) {
      showMessage({
        message: `Error occurred while confirming players. Please try again.`,
        type: "danger",
      });
      console.error("Error while confirming players: ", err);
    }

    router.push({
      pathname: "/scan_intro",
      params: {
        total_players,
        characters_data: characters_data, // Already stringified
        players_names: JSON.stringify(playerNames),
      },
    });
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <Text className="text-center font-bold text-[20px] text-white py-4">
        Players ({players})
      </Text>

      <ScrollView className="mb-20" showsVerticalScrollIndicator={false}>
        {Array.from({ length: players }).map((_, idx: number) => (
          <View key={idx}>
            <View className="flex-row flex-wrap items-center justify-center gap-x-2 my-1.5">
              <View className="h-12 w-12 border border-gray-600 rounded-xl overflow-hidden">
                <Image
                  className="h-full w-full"
                  resizeMode="cover"
                  source={require("../../assets/images/placeholders/placeholder2.jpg")}
                />
              </View>
              <View className="w-[75%] h-12">
                <TextInput
                  className="w-full h-full pl-3 rounded-xl bg-gray-800 text-white border border-gray-600"
                  placeholder={`Player ${idx + 1}`}
                  placeholderTextColor="#B0B0B0"
                  value={playerNames[idx]}
                  onChangeText={(text) => playerNamesChange(idx, text)}
                />
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <View className="continue-button w-full items-center absolute bottom-10">
        <TouchableOpacity
          onPress={confirmPlayers}
          className="bg-gray-700 items-center justify-center p-4 w-[90%] rounded-xl"
        >
          <Text className="text-[16px] font-bold text-white">Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
