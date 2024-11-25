import { View, TouchableOpacity, Text } from "react-native";
import React, { useContext } from "react";
import { Entypo } from "@expo/vector-icons";
import SoundContext from "@/contexts/SoundContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface TopPaneProps {
  iconColor?: "black" | "white";
}

export default function TopPane({ iconColor = "black" }: TopPaneProps) {
  const { soundEnabled, setSoundEnabled } = useContext(SoundContext)!;

  async function clearAsyncStorage() {
    try {
      await AsyncStorage.removeItem("isFirstOpen");
      console.log("Cleared");
    } catch (err) {
      console.log("RemoveItem from Async Storage Error.", err);
    }
  }

  return (
    <View className="flex-row justify-between">
      <TouchableOpacity className="m-3 w-10 p-2">
        {/* onPress={clearAsyncStorage} */}
        {/* <Entypo name="remove-user" size={24} color="white" /> */}
      </TouchableOpacity>

      <View className="justify-start items-center bg-transparent">
        <Text
          style={{ fontFamily: "Bronzetti_SC_Condensed", fontSize: 34 }}
          className="text-[24px] text-slate-300 font-bold my-1"
        >
          Werewolf:
        </Text>
        <Text
          style={{ fontFamily: "Bronzetti_SC_Condensed", fontSize: 26 }}
          className="text-[24px] font-bold text-gray-400"
        >
          Save the Village
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => setSoundEnabled((prev: boolean) => !prev)}
        className="m-3 w-10 p-2"
      >
        {soundEnabled ? (
          <Entypo name="sound" size={24} color={iconColor} />
        ) : (
          <Entypo name="sound-mute" size={24} color={iconColor} />
        )}
      </TouchableOpacity>
    </View>
  );
}
