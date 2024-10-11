import React from "react";
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

export function WakeWerewolfUI({
  playWerewolfAssistance,
  soundEnabled,
}: WakeUIProps) {
  return (
    <View>
      <Text className="text-start text-white font-[16px]">
        - Wake up the Werewolves and let them decide collectively who to
        eliminate this night.
      </Text>
      <View className="items-start m-2">
        <Pressable
          className="bg-gray-700 p-3 rounded-md mt-2"
          onPress={() =>
            playWerewolfAssistance && playWerewolfAssistance(soundEnabled)
          }
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

export function WakeSeerUI({ playSeerAssistance, soundEnabled }: WakeUIProps) {
  return (
    <View>
      <Text className="text-start text-white font-[16px]">
        - Wake up the Seer and let them choose someone from the village. You
        will let the Seer know if the chosen person is a good or bad role.
      </Text>
      <View className="items-start m-2">
        <Pressable
          className="bg-gray-700 p-3 rounded-md"
          onPress={() => playSeerAssistance && playSeerAssistance(soundEnabled)}
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

export function WakeDoctorUI({
  playDoctorAssistance,
  soundEnabled,
}: WakeUIProps) {
  return (
    <View>
      <Text className="text-start text-white font-[16px]">
        Wake up the Doctor and let them choose a person to protect, including
        themselves. Cannot repeat the same person 2 times in a row.
      </Text>
      <View className="items-start m-2">
        <Pressable
          className="bg-gray-700 p-3 rounded-md mt-2"
          onPress={() =>
            playDoctorAssistance && playDoctorAssistance(soundEnabled)
          }
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
