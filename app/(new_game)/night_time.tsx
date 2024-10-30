import React, { useEffect, useState, useRef, useContext } from "react";
import { View, Text, Pressable, Image } from "react-native";
import TopPaneInGame from "@/components/TopPaneInGame";
import { Audio } from "expo-av";
import SoundContext from "@/contexts/SoundContext";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import NightEliminationBottomSheet from "@/components/NewGame/NightEliminationBS";
import {
  WakeWerewolfUI,
  WakeSeerUI,
  WakeDoctorUI,
  WakeBodyguardUI,
  WakePriestUI,
  WakeWitchUI,
  AlphaWerewolfUI,
} from "../../components/NewGame/NightRolesUI";
import { StatusBar } from "expo-status-bar";
import NewGameContext from "@/contexts/NewGameContext";
import { useLocalSearchParams } from "expo-router";

interface Item {
  order: number;
  name: string;
  link: string;
  role: string;
}

export default function NightTime() {
  // Router params
  const params = useLocalSearchParams();
  const { firstNight } = params;
  const isFirstNight = JSON.parse(firstNight as string);

  // Context states
  const { soundEnabled } = useContext(SoundContext);
  const { playersInGame, setPlayersInGame, allPlayersInGame } =
    useContext(NewGameContext);

  const [wolfHowling, setWolfHowling] = useState<Audio.Sound | null>(null);
  const [nightBackgroundSound, setNightBackgroundSound] =
    useState<Audio.Sound | null>(null);

  // Mapping roles to their corresponding UI component
  const roleComponents: { [key: string]: any } = {
    Werewolf: WakeWerewolfUI,
    Seer: WakeSeerUI,
    Doctor: WakeDoctorUI,
    Witch: WakeWitchUI,
    "Alpha Werewolf": AlphaWerewolfUI,
    // First night only roles
    Bodyguard: isFirstNight ? WakeBodyguardUI : null,
    Priest: isFirstNight ? WakePriestUI : null,
  };

  useEffect(() => {
    playWolfHowling();
    playNightBackground();

    // Resetting night role states
    const resetNightState = playersInGame.map((player: any) => ({
      ...player,
      attackedByWerewolves: false,
      protectedByDoctor: false,
      attackedByWitch: false,
      protectedByWitch: false,
    }));

    setPlayersInGame(resetNightState);
  }, []);

  // Load and play the wolf howling sound
  async function playWolfHowling() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/audio/wolf-howling.mp3"),
      { volume: soundEnabled ? 0.3 : 0.0 }
    );
    setWolfHowling(sound);
    await sound?.playAsync();
  }

  // Load and play the night background sound
  async function playNightBackground() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/audio/night-background.mp3"),
      { isLooping: true, volume: soundEnabled ? 0.1 : 0.0 }
    );
    setNightBackgroundSound(sound);
    await sound?.playAsync();
  }

  // Unload sounds when the component unmounts
  useEffect(() => {
    return () => {
      wolfHowling?.unloadAsync();
      setWolfHowling(null);
    };
  }, [wolfHowling]);

  useEffect(() => {
    return () => {
      nightBackgroundSound?.unloadAsync();
      setNightBackgroundSound(null);
    };
  }, [nightBackgroundSound]);

  // Adjust volume based on soundEnabled changed
  useEffect(() => {
    wolfHowling?.setVolumeAsync(soundEnabled ? 0.3 : 0.0);
    nightBackgroundSound?.setVolumeAsync(soundEnabled ? 0.1 : 0.0);
  }, [soundEnabled]);

  // Get unique roles, ensure Werewolf is first and Witch is last if present
  const uniqueRoles = Array.from(
    new Set(allPlayersInGame.map((player: Item) => player.role))
  ).sort((a, b) => {
    if (a === "Werewolf") return -1;
    if (b === "Werewolf") return 1;
    if (a === "Witch") return 1;
    if (b === "Witch") return -1;
    return 0;
  });

  // Bottom Sheet setup
  const eliminatedRoleBSRef = useRef<any>(null);

  const openEliminatedBottomSheet = () => {
    eliminatedRoleBSRef.current?.snapToIndex(0);
  };

  // Stop all night sounds
  function stopNightSounds() {
    wolfHowling?.stopAsync();
    wolfHowling?.unloadAsync();
    nightBackgroundSound?.stopAsync();
    nightBackgroundSound?.unloadAsync();
  }

  return (
    <SafeAreaView className="flex-1 relative">
      <StatusBar style={"light"} />
      <Image
        className="absolute top-0 left-0 w-full h-[111%] z-[-1]"
        resizeMode="cover"
        source={require("../../assets/images/backgrounds/night.jpeg")}
      />
      <TopPaneInGame />

      <Text className="text-center text-white font-bold text-[20px] mt-8 pb-4">
        The Night Has Started
      </Text>
      <Text className="text-start text-white text-[16px] px-10 mb-3">
        As the operator, guide the village through the night. Here are the roles
        to wake up:
      </Text>

      <ScrollView showsVerticalScrollIndicator={false} className="mb-20">
        <View className="mt-4 px-4">
          {uniqueRoles.map((role: any) => {
            const RoleUI = roleComponents[role];
            return RoleUI ? (
              <RoleUI key={role} soundEnabled={soundEnabled} />
            ) : null;
          })}
        </View>
      </ScrollView>

      {/* Bottom Sheet - Continuing to Day time */}
      <NightEliminationBottomSheet
        ref={eliminatedRoleBSRef}
        isFirstNight={isFirstNight}
        stopNightSounds={stopNightSounds}
      />

      <View className="w-full items-center absolute bottom-10 z-[-1]">
        <Pressable
          className="bg-gray-800 items-center justify-center p-4 w-[90%] rounded-xl"
          onPress={openEliminatedBottomSheet}
        >
          <Text className="text-[16px] font-bold text-white">Continue</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
