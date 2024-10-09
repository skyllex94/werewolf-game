// components/WakeUIs.tsx
import React, { useContext } from "react";
import { View, Text, Pressable } from "react-native";
import { Audio } from "expo-av";
import SoundContext from "@/contexts/SoundContext";

interface Item {
  name: string;
  role: string;
}

interface WakeUIsProps {
  playersRoles: Item[];
}

const WakeUIs: React.FC<WakeUIsProps> = ({ playersRoles }) => {
  const { soundEnabled } = useContext(SoundContext);

  // Sound states
  const [werewolfAssist, setWerewolfAssist] =
    React.useState<Audio.Sound | null>(null);
  const [seerAssist, setSeerAssist] = React.useState<Audio.Sound | null>(null);
  const [doctorAssist, setDoctorAssist] = React.useState<Audio.Sound | null>(
    null
  );

  // Play sound functions
  async function playWerewolfAssistance() {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/audio/assists/werewolf-assist.mp3"),
      { volume: soundEnabled ? 0.7 : 0.0 }
    );
    setWerewolfAssist(sound);
    // Check if the sound is loaded before playing
    if (sound) await sound.playAsync();
  }

  async function playSeerAssistance() {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/audio/assists/seer-assist.mp3"),
      { volume: soundEnabled ? 0.7 : 0.0 }
    );
    setSeerAssist(sound);
    // Check if the sound is loaded before playing
    if (sound) await sound.playAsync();
  }

  async function playDoctorAssistance() {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/audio/assists/doctor-assist.mp3"),
      { volume: soundEnabled ? 0.7 : 0.0 }
    );
    setDoctorAssist(sound);
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
        <Pressable
          className="bg-gray-700 p-3 rounded-md mt-2"
          onPress={playSeerAssistance}
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
    );
  }

  function WakeDoctorUI() {
    return (
      <View className="">
        <Text className="text-start text-white font-[16px]">
          - Wake up the Doctor and let him choose a person to protect, including
          himself. Cannot repeat the same person 2 times in a row.
        </Text>
        <Pressable
          className="bg-gray-700 p-3 rounded-md mt-2"
          onPress={playDoctorAssistance}
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
    );
  }

  return (
    <>
      {playersRoles.map((player) => {
        switch (player.role) {
          case "Werewolf":
            return <WakeWerewolfUI key={player.name} />;
          case "Seer":
            return <WakeSeerUI key={player.name} />;
          case "Doctor":
            return <WakeDoctorUI key={player.name} />;
          default:
            return null;
        }
      })}
    </>
  );
};

export default WakeUIs;
