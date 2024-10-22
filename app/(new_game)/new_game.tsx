import { StatusBar } from "expo-status-bar";
import { Text, View } from "@/components/Themed";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, ScrollView, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function ModalScreen() {
  const [characters, setCharacters] = useState([
    {
      name: "Villager",
      image: require("../../assets/images/characters/villager.jpeg"),
      min: 3,
      max: 25,
      amount: 2,
    },
    {
      name: "Werewolf",
      image: require("../../assets/images/characters/werewolf.jpeg"),
      min: 1,
      max: 4,
      amount: 1,
    },
    {
      name: "Seer",
      image: require("../../assets/images/characters/seer.jpeg"),
      min: 0,
      max: 1,
      amount: 0,
    },
    {
      name: "Doctor",
      image: require("../../assets/images/characters/doctor.jpg"),
      min: 0,
      max: 1,
      amount: 0,
    },
    {
      name: "Bodyguard",
      image: require("../../assets/images/characters/bodyguard.jpeg"),
      min: 0,
      max: 1,
      amount: 0,
    },
    {
      name: "Hunter",
      image: require("../../assets/images/characters/hunter21.jpg"),
      min: 0,
      max: 1,
      amount: 0,
    },
    {
      name: "Priest",
      image: require("../../assets/images/characters/priest.jpg"),
      min: 0,
      max: 1,
      amount: 0,
    },
    {
      name: "Prince",
      image: require("../../assets/images/characters/prince.jpeg"),
      min: 0,
      max: 1,
      amount: 0,
    },
    {
      name: "Witch",
      image: require("../../assets/images/characters/witch.jpeg"),
      min: 0,
      max: 1,
      amount: 0,
    },
    {
      name: "Tanner",
      image: require("../../assets/images/characters/lurker3.jpeg"),
      min: 0,
      max: 1,
      amount: 0,
    },
    {
      name: "Alpha Werewolf",
      image: require("../../assets/images/characters/alpha-werewolf.jpg"),
      min: 0,
      max: 1,
      amount: 0,
    },
    {
      name: "Lycan",
      image: require("../../assets/images/characters/lycan.jpeg"),
      min: 0,
      max: 1,
      amount: 0,
    },
    {
      name: "Cursed Villager",
      image: require("../../assets/images/characters/cursed-villager.jpeg"),
      min: 0,
      max: 1,
      amount: 0,
    },
    {
      name: "Cupid",
      image: require("../../assets/images/characters/cupid.jpeg"),
      min: 0,
      max: 1,
      amount: 0,
    },
    {
      name: "Wolf Cub",
      image: require("../../assets/images/characters/wolf-cub.jpeg"),
      min: 0,
      max: 1,
      amount: 0,
    },
  ]);

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
    <SafeAreaView className="flex-1 items-center">
      <StatusBar style={"auto"} />

      <Text className="text-[20px] font-bold mt-8">Roles ({playerCount})</Text>

      <View className="seperator bg-slate-200 mt-5 h-[1px] w-[80%]" />

      <ScrollView className="w-[100%] ml-3 mt-4 mb-20 rounded-2xl">
        <View className="characters bg-[#f3f3f3] mr-3 flex-row flex-wrap pt-4 gap-2 ">
          {characters.map((character, idx) => (
            <View
              key={idx}
              className="bg-slate-400 w-[48%] h-[280px] rounded-2xl"
            >
              <Text className="absolute text-white text-[15px] font-bold p-2 z-10">
                x{character.amount}
              </Text>

              <Image
                className="w-[100%] h-[70%] rounded-2xl"
                source={character.image}
              />

              <View className="character_counter flex-row justify-between items-center bg-slate-400 mt-2 mx-2">
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
        <TouchableOpacity className="bg-slate-300 items-center justify-center absolute bottom-10 p-4 w-[90%] mx-3 rounded-xl">
          <Text className="text-[16px] font-bold">Continue</Text>
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
  );
}
