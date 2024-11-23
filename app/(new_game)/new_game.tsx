import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Entypo, FontAwesome, Fontisto } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import useRevenueCat from "@/hooks/RevenueCat";

export default function ChooseRoles() {
  const { isProMember } = useRevenueCat();
  const router = useRouter();

  const roles = [
    {
      name: "Villager",
      image: require("../../assets/images/characters/villager.jpeg"),
      min: 3,
      max: 25,
      amount: 4,
      unlocked: true,
      info: "/villager",
    },
    {
      name: "Werewolf",
      image: require("../../assets/images/characters/werewolf.jpeg"),
      min: 1,
      max: 4,
      amount: 1,
      unlocked: true,
      info: "/werewolf",
    },
    {
      name: "Seer",
      image: require("../../assets/images/characters/seer.jpeg"),
      min: 0,
      max: 1,
      amount: 0,
      unlocked: true,
      info: "/seer",
    },
    {
      name: "Doctor",
      image: require("../../assets/images/characters/doctor.jpg"),
      min: 0,
      max: 1,
      amount: 0,
      unlocked: isProMember,
      info: "/doctor",
    },
    {
      name: "Bodyguard",
      image: require("../../assets/images/characters/bodyguard.jpeg"),
      min: 0,
      max: 1,
      amount: 0,
      unlocked: isProMember,
      info: "/bodyguard",
    },
    {
      name: "Hunter",
      image: require("../../assets/images/characters/hunter.jpg"),
      min: 0,
      max: 1,
      amount: 0,
      unlocked: isProMember,
      info: "/hunter",
    },
    {
      name: "Priest",
      image: require("../../assets/images/characters/priest.jpg"),
      min: 0,
      max: 1,
      amount: 0,
      unlocked: isProMember,
      info: "/priest",
    },
    {
      name: "Prince",
      image: require("../../assets/images/characters/prince.jpeg"),
      min: 0,
      max: 1,
      amount: 0,
      unlocked: isProMember,
      info: "/prince",
    },
    {
      name: "Witch",
      image: require("../../assets/images/characters/witch.jpeg"),
      min: 0,
      max: 1,
      amount: 0,
      unlocked: isProMember,
      info: "/witch",
    },
    {
      name: "Tanner",
      image: require("../../assets/images/characters/lurker3.jpeg"),
      min: 0,
      max: 1,
      amount: 0,
      unlocked: isProMember,
      info: "/tanner",
    },
    {
      name: "Alpha Werewolf",
      image: require("../../assets/images/characters/alpha-werewolf.jpg"),
      min: 0,
      max: 1,
      amount: 0,
      unlocked: isProMember,
      info: "/alpha_werewolf",
    },
    {
      name: "Lycan",
      image: require("../../assets/images/characters/lycan.jpeg"),
      min: 0,
      max: 2,
      amount: 0,
      unlocked: isProMember,
      info: "/lycan",
    },
    {
      name: "Cursed Villager",
      image: require("../../assets/images/characters/cursed-villager.jpeg"),
      min: 0,
      max: 2,
      amount: 0,
      unlocked: isProMember,
      info: "/cursed_villager",
    },
    {
      name: "Cupid",
      image: require("../../assets/images/characters/cupid.jpeg"),
      min: 0,
      max: 1,
      amount: 0,
      unlocked: isProMember,
      info: "/cupid",
    },
    {
      name: "Wolf Cub",
      image: require("../../assets/images/characters/wolf-cub.jpeg"),
      min: 0,
      max: 1,
      amount: 0,
      unlocked: isProMember,
      info: "/wolf_cub",
    },
  ];

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

  // Update character roles based on isProMember change
  useEffect(() => {
    setCharacters((prevCharacters) =>
      prevCharacters.map((character) => ({
        ...character,
        unlocked: character.unlocked || isProMember,
      }))
    );
  }, [isProMember]);

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

      <View className="flex-row items-center justify-between mt-8 w-full">
        {true ? (
          <TouchableOpacity onPress={() => router.back()} className="w-10 px-2">
            <Entypo name="chevron-left" size={24} color={"white"} />
          </TouchableOpacity>
        ) : (
          <View className="w-10"></View>
        )}

        <Text className="text-[20px] font-bold text-white">
          Roles ({playerCount})
        </Text>

        <View className="w-10"></View>
      </View>

      <View className="seperator bg-slate-600 mt-5 h-[0.5px] w-[50%]" />

      <ScrollView
        className="mt-4 mb-20 rounded-2xl"
        showsVerticalScrollIndicator={false}
      >
        <View className="characters bg-gray-900 flex-row flex-wrap pt-4 gap-2 px-2">
          {characters.map((character, idx) => (
            <View
              key={idx}
              className="bg-gray-700 w-[48%] h-[280px] rounded-2xl relative"
            >
              <Text className="absolute text-white text-[15px] m-1 font-bold p-2 z-10">
                x{character.amount}
              </Text>

              <TouchableOpacity
                onPress={() => router.push(`${character.info}` as any)}
                className="absolute text-[15px] z-20 font-bold m-2 py-2 px-3 bg-slate-800 opacity-70 rounded-full right-0"
              >
                <Fontisto name="info" size={14} color="white" />
              </TouchableOpacity>

              {/* Conditional overlay for locked roles */}
              {!character.unlocked && (
                <TouchableOpacity
                  onPress={() => router.push("/shared/paywall")}
                  className="absolute top-0 left-0 w-full h-full z-10 bg-white opacity-40 rounded-2xl"
                >
                  <View className="items-center justify-center mt-8 h-[100%]">
                    <FontAwesome name="lock" size={44} color="black" />
                  </View>
                </TouchableOpacity>
              )}

              <Image
                className="w-[100%] h-[70%] rounded-2xl"
                source={character.image}
              />

              <View className="character_counter flex-row justify-between items-center bg-gray-600 mt-2 mx-2 rounded-xl py-1 px-2">
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
