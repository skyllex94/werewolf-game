import { View, TouchableOpacity, Text } from "react-native";
import React, { useContext } from "react";
import { Entypo } from "@expo/vector-icons";
import SoundContext from "@/contexts/SoundContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";

interface TopPaneProps {
  iconColor?: "black" | "white";
}

export default function TopPane({ iconColor = "black" }: TopPaneProps) {
  const { soundEnabled, setSoundEnabled } = useContext(SoundContext)!;

  const { t, i18n } = useTranslation();

  async function clearAsyncStorage() {
    try {
      await AsyncStorage.removeItem("isFirstOpen");
      console.log("Cleared");
    } catch (err) {
      console.log("RemoveItem from Async Storage Error.", err);
    }
  }

  const switchLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <View className="flex-row justify-between">
      <TouchableOpacity
        onPress={() => switchLanguage("es")}
        className="m-3 w-10 p-2"
      >
        <Entypo name="globe" size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => switchLanguage("en")}
        className="m-3 w-10 p-2"
      >
        <Entypo name="globe" size={24} color="white" />
      </TouchableOpacity>

      <View className="justify-start items-center bg-transparent">
        <Text
          style={{ fontFamily: "Bronzetti_SC_Condensed", fontSize: 34 }}
          className="text-[24px] text-slate-300 font-bold my-1"
        >
          {t("title")}
        </Text>
        <Text
          style={{ fontFamily: "Bronzetti_SC_Condensed", fontSize: 26 }}
          className="text-[24px] font-bold text-gray-400"
        >
          {t("subtitle")}
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
