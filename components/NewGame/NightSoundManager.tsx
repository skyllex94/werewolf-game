import React, { useEffect, useState, useContext } from "react";
import { Audio } from "expo-av";
import SoundContext from "@/contexts/SoundContext";

interface NightSoundManagerProps {
  isNightTime: boolean;
}

const NightSoundManager: React.FC<NightSoundManagerProps> = ({
  isNightTime,
}) => {
  const [wolfHowling, setWolfHowling] = useState<Audio.Sound | null>(null);
  const [nightBackgroundSound, setNightBackgroundSound] =
    useState<Audio.Sound | null>(null);
  const { soundEnabled } = useContext(SoundContext);

  useEffect(() => {
    const playSounds = async () => {
      if (isNightTime) {
        // Play wolf howling sound
        const { sound: howlSound } = await Audio.Sound.createAsync(
          require("../../assets/audio/wolf-howling.mp3"),
          { volume: soundEnabled ? 0.3 : 0.0 }
        );
        setWolfHowling(howlSound);
        await howlSound.playAsync();

        // Play night background sound
        const { sound: bgSound } = await Audio.Sound.createAsync(
          require("../../assets/audio/night-background.mp3"),
          { isLooping: true, volume: soundEnabled ? 0.1 : 0.0 }
        );
        setNightBackgroundSound(bgSound);
        await bgSound.playAsync();
      } else {
        // Stop sounds when not nighttime
        if (wolfHowling) {
          await wolfHowling.stopAsync();
          await wolfHowling.unloadAsync();
        }
        if (nightBackgroundSound) {
          await nightBackgroundSound.stopAsync();
          await nightBackgroundSound.unloadAsync();
        }
      }
    };

    playSounds();

    // Cleanup on unmount or when isNightTime changes
    return () => {
      if (wolfHowling) {
        wolfHowling.stopAsync();
        wolfHowling.unloadAsync();
      }
      if (nightBackgroundSound) {
        nightBackgroundSound.stopAsync();
        nightBackgroundSound.unloadAsync();
      }
    };
  }, [isNightTime, soundEnabled]);

  // Adjust volume based on soundEnabled changed
  useEffect(() => {
    wolfHowling?.setVolumeAsync(soundEnabled ? 0.3 : 0.0);
    nightBackgroundSound?.setVolumeAsync(soundEnabled ? 0.1 : 0.0);
  }, [soundEnabled, wolfHowling, nightBackgroundSound]);

  return null;
};

export default NightSoundManager;
