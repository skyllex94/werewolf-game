import { StatusBar } from "expo-status-bar";

import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Link } from "expo-router";
import { roles } from "@/constants/GameConstants";

export default function ChooseRoles() {
  const [characters, setCharacters] = useState(roles);

  // Calculate total player count
  const calculateTotalPlayers = () => {
    return characters.reduce((total, character) => total + character.amount, 0);
  };

  // Total player amount
  const [playerCount, setPlayerCount] = useState(calculateTotalPlayers());

  // Update playerCount whenever characters amount changes
  useEffect(() => {
    setPlayerCount(calculateTotalPlayers());
  }, [characters]);

  const updateCharacterAmount = (name: string, action: string) => {
    setCharacters((prevCharacters) =>
      prevCharacters.map((character) => {
        if (character.name === name) {
          let newAmount = character.amount;

          if (action === "increase" && character.amount < character.max) {
            newAmount = character.amount + 1;
          } else if (
            action === "decrease" &&
            character.amount > character.min
          ) {
            newAmount = character.amount - 1;
          }

          return {
            ...character,
            amount: newAmount,
          };
        }
        return character;
      })
    );
  };

  return (
    <SafeAreaView className="flex-1 items-center bg-gray-900">
      <StatusBar style={"light"} />

      <Text className="text-[20px] font-bold mt-8 text-white">
        Roles ({playerCount})
      </Text>

      <View className="seperator bg-slate-600 mt-5 h-[0.5px] w-[50%]" />

      <ScrollView
        className="mt-4 mb-20 rounded-2xl"
        showsVerticalScrollIndicator={false}
      >
        <View className="characters bg-gray-900 flex-row flex-wrap pt-4 gap-2 px-2">
          {characters.map((character, idx) => (
            <View
              key={idx}
              className="bg-gray-700 w-[48%] h-[280px] rounded-2xl"
            >
              <Text className="absolute text-white text-[15px] font-bold p-2 z-10">
                x{character.amount}
              </Text>

              <Image
                className="w-[100%] h-[70%] rounded-2xl"
                source={character.image}
              />

              <View
                className="character_counter flex-row justify-between items-center
               bg-gray-600 mt-2 mx-2 drop-shadow-lg rounded-xl py-1 px-2"
              >
                <TouchableOpacity
                  onPress={() =>
                    updateCharacterAmount(character.name, "decrease")
                  }
                  className="p-2 border border-white rounded-full"
                >
                  <Entypo name="minus" size={24} color="white" />
                </TouchableOpacity>

                <Text className="text-center w-[50%] text-white font-bold">
                  {character.name}
                </Text>

                <TouchableOpacity
                  onPress={() =>
                    updateCharacterAmount(character.name, "increase")
                  }
                  className="p-2 my-2 border border-white rounded-full"
                >
                  <Entypo name="plus" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <Link
        href={{
          pathname: "/players_names",
          params: {
            total_players: playerCount,
            characters_data: JSON.stringify(
              characters.map((character) => ({
                type: character.name,
                amount: character.amount,
              }))
            ),
          },
        }}
        asChild
      >
        <TouchableOpacity className="bg-gray-700 items-center justify-center absolute bottom-10 p-4 w-[90%] mx-3 rounded-xl">
          <Text className="text-[16px] font-bold text-white">Continue</Text>
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
  );
}
