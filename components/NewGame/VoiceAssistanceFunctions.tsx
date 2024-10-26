import React, { useContext, useEffect, useState } from "react";
import { View, Text, Pressable, Alert, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import NewGameContext from "@/contexts/NewGameContext";
import { Ionicons } from "@expo/vector-icons";

interface WakeUIProps {
  soundEnabled: boolean;
  playWerewolfAssistance?: (soundEnabled: boolean) => Promise<void>;
  playSeerAssistance?: (soundEnabled: boolean) => Promise<void>;
  playDoctorAssistance?: (soundEnabled: boolean) => Promise<void>;
}

// Sound assistance functions
export async function playWerewolfAssistance(
  soundEnabled: boolean
): Promise<void> {
  const { sound } = await Audio.Sound.createAsync(
    require("../../assets/audio/assists/werewolf-assist.mp3"),
    { volume: soundEnabled ? 0.7 : 0.0 }
  );
  if (sound) await sound.playAsync();
}

export async function playSeerAssistance(soundEnabled: boolean): Promise<void> {
  const { sound } = await Audio.Sound.createAsync(
    require("../../assets/audio/assists/seer-assist.mp3"),
    { volume: soundEnabled ? 0.7 : 0.0 }
  );
  if (sound) await sound.playAsync();
}

export async function playDoctorAssistance(
  soundEnabled: boolean
): Promise<void> {
  const { sound } = await Audio.Sound.createAsync(
    require("../../assets/audio/assists/doctor-assist.mp3"),
    { volume: soundEnabled ? 0.7 : 0.0 }
  );
  if (sound) await sound.playAsync();
}

// Wake Werewolf voice assistance
export function WakeWerewolfUI({ soundEnabled }: WakeUIProps) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  useEffect(() => {
    return () => {
      sound?.unloadAsync();
    };
  }, [sound]);

  useEffect(() => {
    if (sound) {
      sound.setVolumeAsync(soundEnabled ? 0.7 : 0.0);
    }
  }, [soundEnabled]);

  const handlePlayWerewolfAssistance = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/audio/assists/werewolf-assist.mp3"),
      { volume: soundEnabled ? 0.7 : 0.0 }
    );
    setSound(sound);
    await sound.playAsync();
  };

  return (
    <View className="border-slate-500 rounded-lg p-3 border-[0.5px] my-1">
      <View className="flex-row items-center gap-3 justify-center mt-1 ">
        <Text className="text-start text-white font-[16px]">
          - Wake up the Werewolves and let them decide collectively who to
          eliminate this night.
        </Text>
      </View>

      <View className="flex-row items-center m-2">
        <Pressable
          className="bg-gray-700 p-2 rounded-lg mr-3"
          onPress={handlePlayWerewolfAssistance}
        >
          {({ pressed }) => (
            <Ionicons
              className={`text-[14px] font-bold text-white ${
                pressed ? "opacity-70" : "opacity-100"
              }`}
              name="volume-high"
              size={24}
              color="white"
            />
          )}
        </Pressable>
      </View>
    </View>
  );
}

// Wake Seer voice assistance
export function WakeSeerUI({ soundEnabled }: WakeUIProps) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  useEffect(() => {
    return () => {
      sound?.unloadAsync();
    };
  }, [sound]);

  useEffect(() => {
    if (sound) {
      sound.setVolumeAsync(soundEnabled ? 0.7 : 0.0);
    }
  }, [soundEnabled]);

  const handlePlaySeerAssistance = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/audio/assists/seer-assist.mp3"),
      { volume: soundEnabled ? 0.7 : 0.0 }
    );
    setSound(sound);
    await sound.playAsync();
  };

  return (
    <View>
      <Text className="text-start text-white font-[16px]">
        - Wake up the Seer and let them choose someone from the village. You
        will let the Seer know if the chosen person is a good or bad role.
      </Text>
      <View className="items-start m-2">
        <Pressable
          className="bg-gray-700 p-3 rounded-md"
          onPress={handlePlaySeerAssistance}
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

// Wake Doctor voice assistance
export function WakeDoctorUI({ soundEnabled }: WakeUIProps) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [selectedPlayerName, setSelectedPlayerName] =
    useState<string>("Choose Player");
  const { playersLeft, setPlayersLeft } = useContext(NewGameContext);

  useEffect(() => {
    return () => {
      sound?.unloadAsync();
    };
  }, [sound]);

  useEffect(() => {
    if (sound) {
      sound.setVolumeAsync(soundEnabled ? 0.7 : 0.0);
    }
  }, [soundEnabled]);

  const handlePlayDoctorAssistance = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/audio/assists/doctor-assist.mp3"),
      { volume: soundEnabled ? 0.7 : 0.0 }
    );
    setSound(sound);
    await sound.playAsync();
  };

  const choosePlayerProtectedByDoctor = () => {
    // Filter out the Doctor from the playersLeft array
    const availablePlayers = playersLeft.filter(
      (player: any) => player.role !== "Doctor"
    );

    const playerOptions = availablePlayers.map((player: any) => ({
      text: player.name,

      onPress: () => {
        // Clear previous protection by the Doctor
        playersLeft.forEach((p: any) => {
          if (p.protectedByDoctor) {
            p.protectedByDoctor = false;
          }
        });

        // Protect the new player
        player.protectedByDoctor = true;

        const updatedPlayers = playersLeft.map((p: any) => ({
          ...p,
          protectedByDoctor: p.name === player.name,
        }));
        setPlayersLeft(updatedPlayers); // Update context state

        // Set the selected player's name in the state
        setSelectedPlayerName(`Protected: ${player.name}`);
      },
    }));

    // Add a cancel button to the alert
    playerOptions.push({
      text: "Cancel",
      style: "cancel",
    });

    // Show the alert
    Alert.alert(
      "Choose Player to Protect",
      "Select one player to be protected by the Doctor",
      playerOptions
    );
  };

  return (
    <View className="border-slate-500 rounded-lg p-3 border-[0.5px] my-1">
      <View className="flex-row items-center gap-3 justify-center mt-1">
        <Text className="text-start text-white font-[16px]">
          - Wake up the Doctor and let them choose a person to protect,
          including themselves. Cannot repeat the same person 2 times in a row.
        </Text>
      </View>

      <View className="flex-row items-center m-2">
        {/* Button for Doctor voice assistance */}
        <Pressable
          className="bg-gray-700 p-2 rounded-lg mr-2"
          onPress={handlePlayDoctorAssistance}
        >
          {({ pressed }) => (
            <Ionicons
              className={`text-[14px] font-bold text-white ${
                pressed ? "opacity-70" : "opacity-100"
              }`}
              name="volume-high"
              size={24}
              color="white"
            />
          )}
        </Pressable>

        {/* Button to choose player */}
        <Pressable
          className="bg-gray-700 p-3 rounded-lg"
          onPress={choosePlayerProtectedByDoctor}
        >
          {({ pressed }) => (
            <Text
              className={`text-[14px] font-bold text-white ${
                pressed ? "opacity-70" : "opacity-100"
              }`}
            >
              {selectedPlayerName}
            </Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}

// Wake Bodyguard voice assistance
export function WakeBodyguardUI({ soundEnabled }: WakeUIProps) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [selectedPlayerName, setSelectedPlayerName] =
    useState<string>("Choose Player");
  const { playersLeft, setPlayersLeft } = useContext(NewGameContext);

  useEffect(() => {
    return () => {
      sound?.unloadAsync();
    };
  }, [sound]);

  useEffect(() => {
    if (sound) {
      sound.setVolumeAsync(soundEnabled ? 0.7 : 0.0);
    }
  }, [soundEnabled]);

  const handlePlayBodyguardAssistance = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/audio/assists/bodyguard-assist.mp3"),
      { volume: soundEnabled ? 0.7 : 0.0 }
    );
    setSound(sound);
    await sound.playAsync();
  };

  const chooseGuardedPlayer = () => {
    // Filter out the Bodyguard from the playersLeft array
    const availablePlayers = playersLeft.filter(
      (player: any) => player.role !== "Bodyguard"
    );

    const playerOptions = availablePlayers.map((player: any) => ({
      text: player.name,

      onPress: () => {
        // Clear any previous Bodyguard protection
        playersLeft.forEach((p: any) => {
          if (p.protectedByBodyguard) {
            p.protectedByBodyguard = false;
            p.numberOfAttacks = 0;
          }
        });

        // Protect the new player
        player.protectedByBodyguard = true;
        player.numberOfAttacks = 0;

        // Updating the shield UI in the bottomSheet
        const updatedPlayers = playersLeft.map((p: any) => ({
          ...p,
          protectedByBodyguard: p.name === player.name,
        }));
        setPlayersLeft(updatedPlayers);

        // Set the selected player's name in the state
        setSelectedPlayerName(`Protected: ${player.name}`);
      },
    }));

    // Add a cancel button to the alert
    playerOptions.push({
      text: "Cancel",
      style: "cancel",
    });

    // Show the alert
    Alert.alert("Choose Player to Protect", "Select one player", playerOptions);
  };

  return (
    <View className="border-slate-500 rounded-lg p-3 border-[0.5px] my-1">
      <View className="flex-row items-center gap-3 justify-center mt-1">
        <Text className="text-start text-white font-[16px]">
          - Wake up the Bodyguard. He will choose a player through the first
          night to protect for the rest of the game. If this player gets
          attacked twice, the Bodyguard will die instead of them.
        </Text>
      </View>

      <View className="flex-row items-center m-2">
        {/* Button for Bodyguard voice assistance */}
        <Pressable
          className="bg-gray-700 p-2 rounded-lg mr-2"
          onPress={handlePlayBodyguardAssistance}
        >
          {({ pressed }) => (
            <Ionicons
              className={`text-[14px] font-bold text-white ${
                pressed ? "opacity-70" : "opacity-100"
              }`}
              name="volume-high"
              size={24}
              color="white"
            />
          )}
        </Pressable>

        {/* Button to choose player */}
        <Pressable
          className="bg-gray-700 p-3 rounded-lg "
          onPress={chooseGuardedPlayer}
        >
          {({ pressed }) => (
            <Text
              className={`text-[14px] font-bold text-white ${
                pressed ? "opacity-70" : "opacity-100"
              }`}
            >
              {selectedPlayerName}
            </Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}
