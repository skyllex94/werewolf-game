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
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { showMessage } from "react-native-flash-message";

export default function PlayersNames() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { total_players, characters_data } = params;

  const players = parseInt(total_players as string);

  // console.log("total_players:", players, typeof players);
  // console.log("characters:", characters);

  const [playerNames, setPlayerNames] = useState<string[]>(
    Array(players).fill("")
  );
  console.log("playerNames:", playerNames);

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

    router.push({
      pathname: "(new_game)/scan_intro",
      params: {
        total_players,
        characters_data: characters_data, // Already stringified
        players_names: JSON.stringify(playerNames),
      },
    });
  }

  return (
    <SafeAreaView>
      <Text className="text-center font-bold text-[20px] py-4">
        Players ({players})
      </Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {Array.from({ length: players }).map((player, idx: number) => (
          <View key={idx}>
            <View className="flex-row flex-wrap items-center justify-center gap-2 my-1">
              <View className="h-28 w-[25%] ">
                <Image
                  className="h-[100%] w-[100%] border border-b-2 border-slate-500 rounded-xl"
                  resizeMode="contain"
                  source={require("../../assets/images/placeholders/placeholder.jpg")}
                />
              </View>
              <View className="w-[65%]">
                <TextInput
                  className="p-3 w-[100%] rounded-lg border border-b-2 border-slate-500 my-1"
                  key={idx}
                  placeholder={`Player ${idx + 1}`}
                  value={playerNames[idx]}
                  onChangeText={(text) => playerNamesChange(idx, text)}
                />

                <View className="flex-row justify-between pt-1">
                  <TouchableOpacity className="w-[49%] items-center p-3 border border-b-2 border-slate-500 rounded-lg">
                    <Entypo name="camera" size={20} color="black" />
                    <Text className="">Camera</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="w-[49%] items-center p-3 border border-b-2 border-slate-500 rounded-lg">
                    <MaterialIcons
                      name="photo-size-select-actual"
                      size={20}
                      color="black"
                    />
                    <Text className="">Library</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <View className="h-[35%]">
        <View className="items-center justify-center mt-4">
          <TouchableOpacity
            onPress={confirmPlayers}
            className="bg-slate-300 p-4 w-[90%] rounded-xl"
          >
            <Text className="text-center text-[16px] font-bold">Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
