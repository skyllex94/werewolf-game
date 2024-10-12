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
        message: `Error occured while confirming players. Please try again.`,
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
    <SafeAreaView className="flex-1 ">
      <Text className="text-center font-bold text-[20px] py-4">
        Players ({players})
      </Text>

      <ScrollView className="mb-20" showsVerticalScrollIndicator={false}>
        {Array.from({ length: players }).map((player, idx: number) => (
          <View key={idx}>
            <View className="flex-row flex-wrap items-center justify-center gap-x-2 my-1.5">
              <View className="h-12 w-12 border border-slate-500 rounded-xl overflow-hidden">
                <Image
                  className="h-[100%] w-[100%]"
                  resizeMode="cover"
                  source={require("../../assets/images/placeholders/placeholder2.jpg")}
                />
              </View>
              <View className="w-[75%] h-12">
                <TextInput
                  className="w-[100%] h-12 pl-3 rounded-xl border border-slate-500"
                  key={idx}
                  placeholder={`Player ${idx + 1}`}
                  value={playerNames[idx]}
                  onChangeText={(text) => playerNamesChange(idx, text)}
                />

                {/*
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
                */}
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <View className="continue-button w-[100%] items-center absolute bottom-10">
        <TouchableOpacity
          onPress={confirmPlayers}
          className="bg-slate-300 items-center justify-center p-4 w-[90%] rounded-xl z-10"
        >
          <Text className="text-[16px] font-bold">Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
