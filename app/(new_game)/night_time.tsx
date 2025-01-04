import React, { useEffect, useRef, useContext } from "react";
import { View, Text, Pressable, Image } from "react-native";
import TopPaneInGame from "@/components/TopPaneInGame";

import RolesUI from "@/components/NewGame/RolesUI";
import SoundContext from "@/contexts/SoundContext";

import { SafeAreaView } from "react-native-safe-area-context";
import NightEliminationBottomSheet from "@/components/NewGame/NightEliminationBS";
import { StatusBar } from "expo-status-bar";
import NewGameContext from "@/contexts/NewGameContext";
import { useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";

export default function NightTime() {
  // Router params
  const params = useLocalSearchParams();
  const { firstNight } = params;
  const isFirstNight = JSON.parse(firstNight as string);

  const { t } = useTranslation();

  // Context states
  const { playersInGame, setPlayersInGame } = useContext(NewGameContext);
  const { soundEnabled } = useContext(SoundContext)!;

  // Sound manager state to control sounds
  const { setNightSoundsEnabled } = useContext(SoundContext)!;

  useEffect(() => {
    // Resetting night role states
    const resetNightState = playersInGame.map((player: any) => ({
      ...player,
      attackedByWerewolves: false,
      protectedByDoctor: false,
      attackedByWitch: false,
      protectedByWitch: false,
    }));

    setNightSoundsEnabled(true);
    setPlayersInGame(resetNightState);
  }, []);

  // Bottom Sheet setup
  const eliminatedRoleBSRef = useRef<any>(null);

  const openEliminatedBottomSheet = () => {
    eliminatedRoleBSRef.current?.snapToIndex(0);
  };

  return (
    <SafeAreaView className="flex-1 relative">
      <StatusBar style={"light"} />
      <Image
        className="absolute top-0 left-0 w-full h-[111%] z-[-1]"
        resizeMode="cover"
        source={require("../../assets/images/backgrounds/night_upscaled.jpeg")}
      />
      <TopPaneInGame rolesModalDarkMode="true" />

      <Text className="text-center text-white font-bold text-[20px] mt-8 pb-4">
        {t("nightTimeScreen.title")}
      </Text>
      <Text className="text-start text-white text-[14px] font-light px-6 mb-3">
        {t("nightTimeScreen.subtitle")}
      </Text>

      {/* Displaying all the roles */}
      <RolesUI isFirstNight={isFirstNight} soundEnabled={soundEnabled} />

      {/* Bottom Sheet - Continuing to Day time */}
      <NightEliminationBottomSheet
        ref={eliminatedRoleBSRef}
        isFirstNight={isFirstNight}
        setNightSoundsEnabled={setNightSoundsEnabled}
      />

      <View className="w-full items-center absolute bottom-10 z-[-1]">
        <Pressable
          className="bg-gray-800 items-center justify-center p-4 w-[90%] rounded-xl"
          onPress={openEliminatedBottomSheet}
        >
          <Text className="text-[16px] font-bold text-white">
            {t("nightTimeScreen.continue")}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
