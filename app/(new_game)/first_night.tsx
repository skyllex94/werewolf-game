import React, { useContext, useEffect, useState } from "react";
import { View, Text, Pressable, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import TopPaneInGame from "@/components/TopPaneInGame";

// Sound imports
import { Audio } from "expo-av";
import SoundContext from "@/contexts/SoundContext";

interface Item {
  order: number;
  name: string;
  link: string;
  role: string;
}

export default function FirstNight() {
  // Passed param object
  const params = useLocalSearchParams();
  const { players_roles } = params;

  // Context
  const { soundEnabled } = useContext(SoundContext);
  console.log("soundEnabled:", soundEnabled);

  // Sound states
  const [wolfHowling, setWolfHowling] = useState<Audio.Sound | null>(null);
  const [nightBackgroundSound, setNightBackgroundSound] =
    useState<Audio.Sound | null>(null);
  const [werewolfAssist, setWerewolfAssist] = useState<Audio.Sound | null>(
    null
  );

  const [rolePrompts, setRolePrompts] = useState<string[]>([]);
  const [werewolvesOutnumber, setWerewolvesOutnumber] =
    useState<boolean>(false);

  // Generate prompts and check werewolves count when the component mounts
  useEffect(() => {
    const prompts = generateRolePrompts();
    setRolePrompts(prompts);
    playWolfHowling();
    playNightBackground();
  }, []);

  // Load and play the wolf howling sound
  async function playWolfHowling() {
    console.log("Loading Wolf Howling Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/audio/wolf-howling.mp3"),
      { volume: soundEnabled ? 0.3 : 0.0 }
    );
    setWolfHowling(sound);

    // Check if the sound is loaded before playing
    if (sound) {
      await sound.playAsync();
    }
  }

  // Load and play the night background sound
  async function playNightBackground() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/audio/night-background.mp3"),
      { isLooping: true, volume: soundEnabled ? 0.1 : 0.0 }
    );
    setNightBackgroundSound(sound);
    // Check if the sound is loaded before playing
    if (sound) {
      await sound.playAsync();
    }
  }

  // Unload sounds when the component unmounts
  useEffect(() => {
    return () => {
      if (wolfHowling) {
        console.log("Unloading Wolf Howling Sound");
        wolfHowling.unloadAsync();
        setWolfHowling(null); // Reset state
      }
    };
  }, [wolfHowling]);

  useEffect(() => {
    return () => {
      if (nightBackgroundSound) {
        console.log("Unloading Night Background Sound");
        nightBackgroundSound.unloadAsync();
        setNightBackgroundSound(null);
      }
    };
  }, [nightBackgroundSound]);

  useEffect(() => {
    return () => {
      if (werewolfAssist) {
        console.log("Unloading Night Background Sound");
        werewolfAssist.unloadAsync();
        setNightBackgroundSound(null);
      }
    };
  }, [werewolfAssist]);

  // Adjust volume based on soundEnabled changes
  useEffect(() => {
    if (wolfHowling) {
      // Mute or restore volume
      wolfHowling.setVolumeAsync(soundEnabled ? 0.3 : 0.0);
    }
    if (nightBackgroundSound) {
      // Mute or restore volume
      nightBackgroundSound.setVolumeAsync(soundEnabled ? 0.1 : 0.0);
    }
    if (werewolfAssist) {
      // Mute or restore volume
      werewolfAssist.setVolumeAsync(soundEnabled ? 0.7 : 0.0);
    }
  }, [soundEnabled, wolfHowling, nightBackgroundSound, werewolfAssist]);

  // Parse the playersRoles array from JSON
  const playersRoles: Item[] = players_roles
    ? JSON.parse(players_roles as string)
    : [];

  // Function to count the roles and generate prompts
  const generateRolePrompts = () => {
    const roleCounts: { [role: string]: number } = {};

    // Count occurrences of each role
    playersRoles.forEach((player) => {
      roleCounts[player.role] = (roleCounts[player.role] || 0) + 1;
    });

    const prompts: string[] = [];

    // Werewolf prompt
    if (roleCounts["Werewolf"]) {
      prompts.push(
        `Wake up the Werewolves and let them decide collectively who to eliminate this night.`
      );
    }

    // Seer prompt
    if (roleCounts["Seer"]) {
      prompts.push(
        `- Wake up the Seer and let him choose someone from the village. You will let the Seer know if the chosen person is a good or a bad role.`
      );
    }

    // Doctor prompt
    if (roleCounts["Doctor"]) {
      prompts.push(
        `Wake up the Doctor and let him choose a person to protect, including himself. Cannot repeat the same person 2 times in a row.`
      );
    }

    // Hunter prompt
    if (roleCounts["Hunter"]) {
      prompts.push(`There is a Hunter.`);
    }

    // Villager prompt
    if (roleCounts["Villager"]) {
      console.log("Villagers: ", roleCounts["Villager"]);
    }

    // Check if werewolves outnumber villagers, doctors, and seers combined
    const werewolfCount = roleCounts["Werewolf"] || 0;
    const othersCount =
      (roleCounts["Villager"] || 0) +
      (roleCounts["Doctor"] || 0) +
      (roleCounts["Seer"] || 0);

    if (werewolfCount > othersCount) {
      setWerewolvesOutnumber(true);
    }

    return prompts;
  };

  async function playWerewolfAssistance() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/audio/assists/werewolf-assist.mp3"),
      { volume: soundEnabled ? 0.7 : 0.0 }
    );
    setWerewolfAssist(sound);
    // Check if the sound is loaded before playing
    if (sound) await sound.playAsync();
  }

  return (
    <SafeAreaView className="flex-1 relative">
      {/* Background Image */}
      <Image
        className="absolute top-0 left-0 w-full h-[111%] z-[-1]"
        resizeMode="cover"
        source={require("../../assets/images/backgrounds/night.jpeg")}
      />
      <TopPaneInGame />

      {/* Header */}
      <View className="items-center justify-center mt-8"></View>

      {/* Heading Text */}
      <Text className="text-center text-white font-bold text-[20px] py-4">
        It's Night Time
      </Text>
      <Text className="text-center text-slate-300 font-light text-[15px] px-10">
        As the operator, guide the village through their first night. Here are
        the roles in play:
      </Text>

      {/* Display role-based prompts */}
      <View className="mt-4 px-10">
        {rolePrompts.map((prompt, index) => (
          <View key={index} className="mb-4">
            <Text className="text-white text-[16px] py-2">{prompt}</Text>

            <View className="flex-row">
              {/* Voice Assistance Button */}
              <Pressable
                className="bg-gray-700 items-center justify-center p-3 rounded-md mt-2"
                onPress={playWerewolfAssistance}
              >
                {({ pressed }) => (
                  <Text
                    className={`text-[14px] font-bold text-white ${
                      pressed ? "opacity-70" : "opacity-100"
                    }`}
                  >
                    Voice Assistance
                  </Text>
                )}
              </Pressable>
            </View>
          </View>
        ))}
      </View>

      {/* Werewolves Outnumber Warning */}
      {werewolvesOutnumber && (
        <View className="mt-4 px-10">
          <Text className="text-red-500 text-[16px] py-2">
            Warning: Werewolves outnumber the remaining villagers, doctors, and
            seers!
          </Text>
        </View>
      )}

      {/* Continue Button */}
      <View className="w-full items-center absolute bottom-10">
        <Pressable
          className="bg-gray-800 items-center justify-center p-4 w-[90%] rounded-xl"
          onPress={() => console.log("Continue pressed")}
        >
          {({ pressed }) => (
            <Text
              className={`text-[16px] font-bold text-white ${
                pressed ? "opacity-70" : "opacity-100"
              }`}
            >
              Continue
            </Text>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
