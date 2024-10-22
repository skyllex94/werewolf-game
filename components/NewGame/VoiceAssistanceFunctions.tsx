import React, { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Audio } from "expo-av";

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
    <View>
      <Text className="text-start text-white font-[16px]">
        - Wake up the Werewolves and let them decide collectively who to
        eliminate this night.
      </Text>
      <View className="items-start m-2">
        <Pressable
          className="bg-gray-700 p-3 rounded-md mt-2"
          onPress={handlePlayWerewolfAssistance}
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

  // Unloading sound
  useEffect(() => {
    return () => {
      sound?.unloadAsync();
    };
  }, [sound]);

  // Adjusting volume if global volume is changed
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

  return (
    <View>
      <Text className="text-start text-white font-[16px]">
        Wake up the Doctor and let them choose a person to protect, including
        themselves. Cannot repeat the same person 2 times in a row.
      </Text>
      <View className="items-start m-2">
        <Pressable
          className="bg-gray-700 p-3 rounded-md mt-2"
          onPress={handlePlayDoctorAssistance}
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

// Wake Bodyguard voice assistance
export function WakeBodyguardUI({ soundEnabled }: WakeUIProps) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  // Unloading sound
  useEffect(() => {
    return () => {
      sound?.unloadAsync();
    };
  }, [sound]);

  // Adjusting volume if global volume is changed
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

  return (
    <View>
      <Text className="text-start text-white font-[16px]">
        - Wake up the Bodyguard. He will choose a player through the first night
        to protect for the rest of the game. If this player gets attacked twice,
        the Bodyguard will die instead of him.
      </Text>
      <View className="items-start m-2">
        <Pressable
          className="bg-gray-700 p-3 rounded-md mt-2"
          onPress={handlePlayBodyguardAssistance}
        >
          {({ pressed }) => (
            <Text
              className={`text-[14px] font-bold text-white ${
                pressed ? "opacity-70" : "opacity-100"
              }`}
            >
              Voice Assistance (Bodyguard)
            </Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}
