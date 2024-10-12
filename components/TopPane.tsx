import { View, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { Entypo } from "@expo/vector-icons";
import SoundContext from "@/contexts/SoundContext";

export default function TopPane() {
  const { soundEnabled, setSoundEnabled } = useContext(SoundContext);

  return (
    <View className="flex-row justify-between">
      <TouchableOpacity className="m-3 w-10 p-2">
        <Entypo name="globe" size={24} color="black" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setSoundEnabled((prev: boolean) => !prev)}
        className="m-3 w-10 p-2"
      >
        {soundEnabled ? (
          <Entypo name="sound" size={24} color="black" />
        ) : (
          <Entypo name="sound-mute" size={24} color="black" />
        )}
      </TouchableOpacity>
    </View>
  );
}
