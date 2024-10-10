import { View, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { Entypo, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import SoundContext from "@/contexts/SoundContext";

export default function TopPaneInGame() {
  const router = useRouter();
  const { soundEnabled, setSoundEnabled } = useContext(SoundContext);

  function goBack() {
    router.back();
  }

  return (
    <View className="flex-row justify-between">
      <View>
        <TouchableOpacity onPress={goBack} className="m-3 w-10 p-2">
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View className="flex-row">
        <TouchableOpacity
          className="flex-row items-center my-3 mx-1 p-2"
          onPress={() =>
            router.push({
              pathname: "/roles_modal",
            })
          }
        >
          <FontAwesome5 name="users" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSoundEnabled((prev: boolean) => !prev)}
          className="my-3 mx-5 w-10 p-2"
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
