import { View, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { Entypo, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import SoundContext from "@/contexts/SoundContext";

interface TopPaneInGameProps {
  iconColor?: "black" | "white";
  rolesModalDarkMode?: string;
}

export default function TopPaneInGame({
  iconColor = "white",
  rolesModalDarkMode = "false",
}: TopPaneInGameProps) {
  const router = useRouter();
  const { soundEnabled, setSoundEnabled } = useContext(SoundContext)!;

  function openGameMenu() {
    router.push({
      pathname: "/game_menu",
      params: { darkMode: rolesModalDarkMode },
    });
  }

  return (
    <View className="flex-row justify-between">
      <View>
        <TouchableOpacity onPress={openGameMenu} className="m-3 p-2">
          <Ionicons name="menu" size={28} color={iconColor} />
        </TouchableOpacity>
      </View>

      <View className="flex-row">
        <TouchableOpacity
          className="flex-row items-center my-3 mx-1 p-2"
          onPress={() =>
            router.push({
              pathname: "/roles_modal",
              params: { darkMode: rolesModalDarkMode },
            })
          }
        >
          <FontAwesome5 name="users" size={24} color={iconColor} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSoundEnabled((prev: boolean) => !prev)}
          className="my-3 mx-5 w-10 p-2"
        >
          {soundEnabled! ? (
            <Entypo name="sound" size={24} color={iconColor} />
          ) : (
            <Entypo name="sound-mute" size={24} color={iconColor} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
