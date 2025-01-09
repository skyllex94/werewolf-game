import React, { useContext, useState } from "react";
import { View, TouchableOpacity, Text, Modal, FlatList } from "react-native";
import { Entypo } from "@expo/vector-icons";
import SoundContext from "@/contexts/SoundContext";
import { useTranslation } from "react-i18next";

interface TopPaneProps {
  iconColor?: "black" | "white";
}

export default function TopPane({ iconColor = "black" }: TopPaneProps) {
  const { soundEnabled, setSoundEnabled } = useContext(SoundContext)!;
  const { t, i18n } = useTranslation();
  const [languageModalVisible, setLanguageModalVisible] = useState(false);

  const languages = [
    { code: "en", label: t("English") },
    { code: "es", label: t("Español") },
    { code: "de", label: t("Deutsch") },
    { code: "jp", label: t("日本語") },
  ];

  const switchLanguage = async (language: string) => {
    await i18n.changeLanguage(language);
    setLanguageModalVisible(false);
  };

  return (
    <View className="flex-row justify-between items-center bg-transparent">
      {/* Language Selector */}
      <TouchableOpacity
        onPress={() => setLanguageModalVisible(true)}
        className="m-3 p-2"
      >
        <Entypo name="globe" size={24} color={iconColor} />
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

      {/* Sound Toggle */}
      <TouchableOpacity
        onPress={() => setSoundEnabled((prev: boolean) => !prev)}
        className="m-3 p-2"
      >
        {soundEnabled ? (
          <Entypo name="sound" size={24} color={iconColor} />
        ) : (
          <Entypo name="sound-mute" size={24} color={iconColor} />
        )}
      </TouchableOpacity>

      {/* Language Modal */}
      <Modal
        transparent
        animationType="slide"
        visible={languageModalVisible}
        onRequestClose={() => setLanguageModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center ">
          <View className="w-4/5 bg-gray-800 rounded-lg p-5">
            <View className="flex-row justify-between items-center">
              {/* Modal Title */}
              <Text className="text-lg font-bold text-white mb-4 tracking-wide">
                {t("chooseLanguage")}
              </Text>

              {/* Close Button */}
              <TouchableOpacity
                onPress={() => setLanguageModalVisible(false)}
                className="self-end mb-4"
              >
                <Entypo name="cross" size={28} color="white" />
              </TouchableOpacity>
            </View>

            {/* Language List */}
            <FlatList
              data={languages}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => switchLanguage(item.code)}
                  className="flex-row justify-between items-center py-3 border-b border-gray-600"
                >
                  <Text className="text-base text-white tracking-wide">
                    {item.label}
                  </Text>
                  {i18n.language === item.code && (
                    <Entypo name="check" size={20} color="white" />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
