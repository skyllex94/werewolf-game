import {
  Text,
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Link, useLocalSearchParams } from "expo-router";
import { Entypo, MaterialIcons } from "@expo/vector-icons";

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

  function playerNamesChange(idx: number, text: string) {
    const updatedPlayerNames = [...playerNames];
    updatedPlayerNames[idx] = text;
    setPlayerNames(updatedPlayerNames);
  }

  return (
    <SafeAreaView>
      <View className="flex-1 items-center justify-center"></View>
      <Text className="text-center font-bold text-[20px]">
        Players ({players})
      </Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {Array.from({ length: players }).map((player, idx: number) => (
          <View className="flex-1 ">
            <View
              key={idx}
              className="flex-row flex-wrap items-center justify-center gap-2 my-1"
            >
              <View className="h-28 w-[28%] border border-b-2 border-slate-500 rounded-lg"></View>
              <View className="w-[65%]">
                <View className="flex-row justify-between">
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
                <TextInput
                  className="p-3 w-[100%] rounded-lg border border-b-2 border-slate-500 my-1"
                  key={idx}
                  placeholder={`Player ${idx + 1}`}
                  value={playerNames[idx]}
                  onChangeText={(text) => playerNamesChange(idx, text)}
                />
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <View className="h-[30%]">
        <Link
          href={{
            pathname: "players_names",
            params: {},
          }}
          asChild
        >
          <View className="items-center justify-center mt-4">
            <TouchableOpacity
              //   onPress={confirmPlayers}
              className="bg-slate-300 p-4 w-[90%] rounded-xl"
            >
              <Text className="text-center text-[16px] font-bold">
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </Link>
      </View>
    </SafeAreaView>
  );
}
