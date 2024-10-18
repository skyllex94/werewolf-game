import React, { useEffect, useState, useRef, useContext } from "react";
import { View, Text, Pressable, Image, Alert } from "react-native";
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
  playWerewolfAssistance,
  playSeerAssistance,
  playDoctorAssistance,
} from "../../components/NewGame/VoiceAssistanceFunctions";
import { StatusBar } from "expo-status-bar";
import NewGameContext from "@/contexts/NewGameContext";

interface Item {
  order: number;
  name: string;
  link: string;
  role: string;
}

export default function NightTime() {
  // Context states
  const { soundEnabled } = useContext(SoundContext);
  const { playersLeft } = useContext(NewGameContext);

  const [wolfHowling, setWolfHowling] = useState<Audio.Sound | null>(null);
  const [nightBackgroundSound, setNightBackgroundSound] =
    useState<Audio.Sound | null>(null);

  const [werewolvesOutnumber, setWerewolvesOutnumber] =
    useState<boolean>(false);

  const allPlayersInGame = playersLeft;

  // Mapping the roles to their corresponding UI component
  const roleComponents: { [key: string]: any } = {
    Werewolf: WakeWerewolfUI,
    Seer: WakeSeerUI,
    Doctor: WakeDoctorUI,
  };

  useEffect(() => {
    playWolfHowling();
    playNightBackground();
  }, []);

  // Load and play the wolf howling sound
  async function playWolfHowling() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/audio/wolf-howling.mp3"),
      { volume: soundEnabled ? 0.3 : 0.0 }
    );
    setWolfHowling(sound);
    if (sound) {
      await sound.playAsync();
    }
  }

  // Load and play the night background sound
  // TODO: Decide whether or not to play the sound when silent mode on
  async function playNightBackground() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/audio/night-background.mp3"),
      { isLooping: true, volume: soundEnabled ? 0.1 : 0.0 }
    );
    setNightBackgroundSound(sound);
    if (sound) {
      await sound.playAsync();
    }
  }

  // Unload sounds when the component unmounts
  useEffect(() => {
    return () => {
      if (wolfHowling) {
        wolfHowling.unloadAsync();
        setWolfHowling(null);
      }
    };
  }, [wolfHowling]);

  useEffect(() => {
    return () => {
      if (nightBackgroundSound) {
        nightBackgroundSound.unloadAsync();
        setNightBackgroundSound(null);
      }
    };
  }, [nightBackgroundSound]);

  // Adjust volume based on soundEnabled changed
  useEffect(() => {
    if (wolfHowling) {
      wolfHowling.setVolumeAsync(soundEnabled ? 0.3 : 0.0);
    }
    if (nightBackgroundSound) {
      nightBackgroundSound.setVolumeAsync(soundEnabled ? 0.1 : 0.0);
    }
  }, [soundEnabled]);

  // Get unique roles for rendering unique components
  const uniqueRoles = Array.from(
    new Set(allPlayersInGame.map((player: Item) => player.role))
  );

  // Bottom Sheet setup
  const eliminatedRoleBSRef = useRef<any>(null);

  const openEliminatedBottomSheet = () => {
    eliminatedRoleBSRef.current?.snapToIndex(0);
  };

  // Stop all night sounds
  function stopNightSounds() {
    if (wolfHowling) {
      wolfHowling.stopAsync() || undefined;
      wolfHowling.unloadAsync() || undefined;
    }
    if (nightBackgroundSound) {
      nightBackgroundSound.stopAsync() || undefined;
      nightBackgroundSound.unloadAsync() || undefined;
    }
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
      <Text className="text-start text-white text-[16px] px-10">
        As the operator, guide the village through the night. Here are the roles
        to wake up at night:
      </Text>

      <ScrollView showsVerticalScrollIndicator={false} className="mb-20">
        <View className="mt-4 px-10">
          {uniqueRoles.map((role: any) => {
            const RoleUI = roleComponents[role];
            return RoleUI ? (
              <RoleUI
                key={role}
                soundEnabled={soundEnabled}
                playWerewolfAssistance={playWerewolfAssistance}
                playSeerAssistance={playSeerAssistance}
                playDoctorAssistance={playDoctorAssistance}
              />
            ) : null;
          })}
        </View>
      </ScrollView>

      {werewolvesOutnumber && (
        <View className="mt-4 px-10">
          <Text className="text-red-500 text-[16px] py-2">
            Warning: Werewolves outnumber the remaining villagers, doctors, and
            seers!
          </Text>
        </View>
      )}

      {/* Bottom Sheet - Continuing to Day time */}
      <NightEliminationBottomSheet
        ref={eliminatedRoleBSRef}
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
