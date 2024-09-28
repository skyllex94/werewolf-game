import { Text, SafeAreaView, View, TextInput } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";

export default function PlayersNames() {
  const params = useLocalSearchParams();
  const { total_players, characters_data } = params;

  const characters = characters_data
    ? JSON.parse(characters_data as string)
    : [];

  const players = parseInt(total_players as string);

  console.log("total_players:", players, typeof players);
  console.log("characters:", characters);

  const [playerNames, setPlayerNames] = useState<string[]>(
    Array(players).fill("")
  );
  console.log("playerNames:", playerNames);

  function playerNameChange(idx: number, text: string) {
    const updatedPlayerNames = [...playerNames];
    updatedPlayerNames[idx] = text;
    setPlayerNames(updatedPlayerNames);
  }

  return (
    <SafeAreaView>
      <View className="flex-1 items-center justify-center"></View>
      <Text className="text-center font-bold text-[20px]">Players</Text>

      <View className="">
        {Array.from({ length: players }).map((player, idx: number) => (
          <View className="flex-row  flex-wrap items-center">
            <TextInput
              className="p-3 rounded-lg border border-slate-500 w-[50%] my-1"
              key={idx}
              placeholder={`Player ${idx + 1}`}
              value={playerNames[idx]}
              onChangeText={(text) => playerNameChange(idx, text)}
            />
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}
