import { View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";

export default function TopPane() {
  const [soundEnabled, setSoundEnabled] = useState(true);

  return (
    <View className="flex-row justify-between">
      <TouchableOpacity
        onPress={() => setSoundEnabled((prev) => !prev)}
        className="m-3 w-10 p-2"
      >
        {soundEnabled ? (
          <Entypo name="sound" size={24} color="black" />
        ) : (
          <Entypo name="sound-mute" size={24} color="black" />
        )}
      </TouchableOpacity>

      <TouchableOpacity className="m-3 w-10 p-2">
        <Entypo name="globe" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}
