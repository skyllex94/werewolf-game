import { View, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { Entypo } from "@expo/vector-icons";
import SoundContext from "@/contexts/SoundContext";
import { useNavigation } from "expo-router";

interface TopPaneProps {
  iconColor?: "black" | "white";
}

export default function RulesTopPane({ iconColor = "black" }: TopPaneProps) {
  const navigation = useNavigation();
  const { soundEnabled, setSoundEnabled } = useContext(SoundContext)!;

  return (
    <View className="flex-row justify-between">
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="m-3 w-10 p-2"
      >
        <Entypo name="chevron-left" size={24} color={iconColor} />
      </TouchableOpacity>

      <View className="flex-row">
        {/* <TouchableOpacity className="m-3 w-10 p-2">
          <Entypo name="globe" size={24} color={iconColor} />
        </TouchableOpacity> */}

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
    </View>
  );
}
