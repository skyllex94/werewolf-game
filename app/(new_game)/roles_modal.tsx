import React, { useContext } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";
import NewGameContext from "@/contexts/NewGameContext";

interface Item {
  order: number;
  name: string;
  link: string;
  role: string;
}

export default function ViewRolesModal() {
  const router = useRouter();
  const { allPlayersInGame } = useContext(NewGameContext);
  console.log("allPlayersInGame:", allPlayersInGame);

  return (
    <SafeAreaView className="flex-1 h-[100%]">
      {/* Header Image */}
      <View className="items-center justify-center mt-8">
        <FontAwesome5 name="users" size={48} color="black" />
      </View>

      {/* Heading Text */}
      <Text className="text-center font-bold text-[20px] py-4">
        Roles of Each Player
      </Text>

      {/* Table Header with vertical separator */}
      <View className="flex-row items-center bg-slate-200 m-5 p-4 rounded-2xl">
        <Text className="font-bold text-left flex-1">Player:</Text>
        <View className="w-[0px] bg-gray-500 h-full mx-4" />
        <Text className="font-bold text-left flex-1">Role:</Text>
      </View>

      {
        // Table Content: Players' roles
        <ScrollView
          className="flex-1 px-5 mb-20"
          showsVerticalScrollIndicator={false}
        >
          {allPlayersInGame.map((player: Item, index: number) => (
            <View
              key={index}
              className={`flex-row items-center py-2 px-4 ${
                index % 2 === 0 ? "bg-slate-100" : "bg-slate-200"
              } rounded-lg mb-2`}
            >
              <Text className="text-left flex-1">
                {player.order}. {player.name}
              </Text>
              <View className="w-[0px] bg-gray-400 h-full mx-4" />
              <Text className="text-left flex-1">{player.role}</Text>
            </View>
          ))}
        </ScrollView>
      }

      {/* Continue Button */}
      <View className="continue-button w-[100%] items-center absolute bottom-10">
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-slate-300 items-center justify-center p-4 w-[90%] rounded-xl z-10"
        >
          <Text className="text-[16px] font-bold">Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
