import React, { useContext, useEffect, useState } from "react";
import { View, Text, Pressable, Image, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import TopPaneInGame from "@/components/TopPaneInGame";

// Sound imports
import { Audio } from "expo-av";
import SoundContext from "@/contexts/SoundContext";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

interface Item {
  order: number;
  name: string;
  link: string;
  role: string;
}

export default function FirstNight() {
  // Passed param object
  const router = useRouter();
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

  const [werewolvesOutnumber, setWerewolvesOutnumber] =
    useState<boolean>(false);

  // Parse the playersRoles array from JSON
  const playersRoles: Item[] = players_roles
    ? JSON.parse(players_roles as string)
    : [];

  // Define role components mapping
  const roleComponents: { [key: string]: () => JSX.Element } = {
    Werewolf: WakeWerewolfUI,
    Seer: WakeSeerUI,
    Doctor: WakeDoctorUI,
  };

  // Check werewolves count when the component mounts and start audio
  useEffect(() => {
    playWolfHowling();
    playNightBackground();

    gameChecks();
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
    console.log("Loading Night BG Sound");
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
        console.log("Unloading Werewolf Assist Sound");
        werewolfAssist.unloadAsync();
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

  // Function to count the roles and generate prompts
  const gameChecks = () => {
    const roleCounts: { [role: string]: number } = {};

    // Count occurrences of each role
    playersRoles.forEach((player) => {
      roleCounts[player.role] = (roleCounts[player.role] || 0) + 1;
    });

    // Check if werewolves outnumber villagers, doctors, and seers combined
    const werewolfCount = roleCounts["Werewolf"] || 0;
    const othersCount =
      (roleCounts["Villager"] || 0) +
      (roleCounts["Doctor"] || 0) +
      (roleCounts["Seer"] || 0);

    if (werewolfCount > othersCount) {
      setWerewolvesOutnumber(true);
      console.log("Werewolves are more than the Good guys");
    }
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

  async function playSeerAssistance() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/audio/assists/seer-assist.mp3"),
      { volume: soundEnabled ? 0.7 : 0.0 }
    );
    setWerewolfAssist(sound);
    // Check if the sound is loaded before playing
    if (sound) await sound.playAsync();
  }

  async function playDoctorAssistance() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/audio/assists/doctor-assist.mp3"),
      { volume: soundEnabled ? 0.7 : 0.0 }
    );
    setWerewolfAssist(sound);
    // Check if the sound is loaded before playing
    if (sound) await sound.playAsync();
  }

  function WakeWerewolfUI() {
    return (
      <View className="">
        <Text className="text-start text-white font-[16px]">
          - Wake up the Werewolves and let them decide collectively who to
          eliminate this night.
        </Text>

        {/* Voice Assistance Button */}
        <View className="items-start m-2">
          <Pressable
            className="bg-gray-700 p-3 rounded-md mt-2"
            onPress={playWerewolfAssistance}
          >
            {({ pressed }) => (
              <Text
                className={`text-[14px] font-bold text-white ${
                  pressed ? "opacity-70" : "opacity-100"
                }`}
              >
                Voice Assistance (Werewolves)
              </Text>
            )}
          </Pressable>
        </View>
      </View>
    );
  }

  function WakeSeerUI() {
    return (
      <View className="">
        <Text className="text-start text-white font-[16px]">
          - Wake up the Seer and let him choose someone from the village. You
          will let the Seer know if the chosen person is a good or bad role with
          thumbs up or down.
        </Text>

        {/* Voice Assistance Button */}
        <View className="items-start m-2">
          <Pressable
            className="bg-gray-700 items-center justify-center p-3 rounded-md"
            onPress={playSeerAssistance} // Play Seer Voice Assistance
          >
            {({ pressed }) => (
              <Text
                className={`text-[14px] font-bold text-white ${
                  pressed ? "opacity-70" : "opacity-100"
                }`}
              >
                Voice Assistance (Seer)
              </Text>
            )}
          </Pressable>
        </View>
      </View>
    );
  }

  function WakeDoctorUI() {
    return (
      <View className="justify-start">
        <Text className="text-start text-white font-[16px]">
          Wake up the Doctor and let him choose a person to protect, including
          himself. Cannot repeat the same person 2 times in a row.
        </Text>

        {/* Voice Assistance Button */}
        <View className="items-start m-2">
          <Pressable
            className="bg-gray-700 items-center justify-center p-3 rounded-md mt-2"
            onPress={playDoctorAssistance} // Play Doctor Voice Assistance
          >
            {({ pressed }) => (
              <Text
                className={`text-[14px] font-bold text-white ${
                  pressed ? "opacity-70" : "opacity-100"
                }`}
              >
                Voice Assistance (Doctor)
              </Text>
            )}
          </Pressable>
        </View>
      </View>
    );
  }

  const wakeUpAlertMessage = () =>
    Alert.alert(
      "Ready for the Day?",
      "Are you sure you woke up all the roles through the night?",
      [
        {
          text: "Yes",
          onPress: () => {
            return router.push({
              pathname: "/day_time",
              params: { players_roles },
            });
          },
        },
        { text: "No", onPress: () => null },
      ]
    );

  return (
    <SafeAreaView className="flex-1 relative">
      {/* Background Image */}
      <Image
        className="absolute top-0 left-0 w-full h-[111%] z-[-1]"
        resizeMode="cover"
        source={require("../../assets/images/backgrounds/night.jpeg")}
      />
      <TopPaneInGame />

      {/* Heading Text */}
      <Text className="text-center text-white font-bold text-[20px] mt-8 pb-4">
        The Night Has Started
      </Text>
      <Text className="text-start text-white text-[16px] px-10">
        As the operator, guide the village through the night. Here are the roles
        to wake up at night:
      </Text>

      <View className="items-center justify-center">
        <View className="seperator bg-slate-400 mt-5 h-[0.5px] w-[80%]" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="mb-20">
        {/* Display role-based prompts dynamically */}
        <View className="mt-4 px-10">
          {playersRoles.map((player) => {
            const RoleUI = roleComponents[player.role];
            // Only render if the component exists
            return RoleUI ? <RoleUI key={player.name} /> : null;
          })}
        </View>
      </ScrollView>

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
      <View className="w-full items-center absolute bottom-10 z-10">
        <Pressable
          className="bg-gray-800 items-center justify-center p-4 w-[90%] rounded-xl"
          onPress={wakeUpAlertMessage}
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
