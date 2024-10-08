import { View, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import SoundContext from "@/contexts/SoundContext";

export default function TopPaneInGame() {
  const rounter = useRouter();
  const { soundEnabled, setSoundEnabled } = useContext(SoundContext);

  function goBack() {
    rounter.back();
  }

  return (
    <View className="flex-row justify-between">
      <View>
        <TouchableOpacity onPress={goBack} className="m-3 w-10 p-2">
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View className="flex-row">
        <TouchableOpacity className="m-3 w-10 p-2">
          <Entypo name="globe" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSoundEnabled((prev: boolean) => !prev)}
          className="m-3 w-10 p-2"
        >
          {soundEnabled ? (
            <Entypo name="sound" size={24} color="white" />
          ) : (
            <Entypo name="sound-mute" size={24} color="white" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
