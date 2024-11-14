// SoundManager.tsx
import React, { useContext, useEffect, useState } from "react";
import { Audio } from "expo-av";
import SoundContext from "@/contexts/SoundContext";

interface SoundManagerProps {
  daySoundsEnabled: boolean;
}

const SoundManager: React.FC<SoundManagerProps> = ({ daySoundsEnabled }) => {
  const [backgroundSound, setBackgroundSound] = useState<Audio.Sound | null>(
    null
  );
  const [ambienceSound, setAmbienceSound] = useState<Audio.Sound | null>(null);
  const { soundEnabled } = useContext(SoundContext);

  useEffect(() => {
    const setVolume = async (sound: Audio.Sound | null) => {
      if (sound) {
        await sound.setVolumeAsync(soundEnabled ? 0.1 : 0.0);
      }
    };

    setVolume(backgroundSound);
    setVolume(ambienceSound);
  }, [soundEnabled, backgroundSound, ambienceSound]);

  useEffect(() => {
    let isMounted = true;

    const playDaytimeSounds = async () => {
      if (daySoundsEnabled) {
        // Load and play the main background sound
        const { sound: bgSound } = await Audio.Sound.createAsync(
          require("../../assets/audio/day-bg-sound.mp3"),
          { isLooping: true, volume: soundEnabled ? 0.1 : 0.0 }
        );
        if (isMounted) setBackgroundSound(bgSound);
        await bgSound.playAsync();

        // Load and play the ambience sound
        const { sound: ambience } = await Audio.Sound.createAsync(
          require("../../assets/audio/day-bg-ambience.mp3"),
          { isLooping: true, volume: soundEnabled ? 0.3 : 0.0 }
        );
        if (isMounted) setAmbienceSound(ambience);
        await ambience.playAsync();
      } else {
        // Stop and unload sounds when not day time
        if (backgroundSound) {
          await backgroundSound.stopAsync();
          await backgroundSound.unloadAsync();
        }
        if (ambienceSound) {
          await ambienceSound.stopAsync();
          await ambienceSound.unloadAsync();
        }
      }
    };

    playDaytimeSounds();

    // Cleanup when component unmounts or day time changes
    return () => {
      isMounted = false;
      if (backgroundSound) {
        backgroundSound.stopAsync();
        backgroundSound.unloadAsync();
      }
      if (ambienceSound) {
        ambienceSound.stopAsync();
        ambienceSound.unloadAsync();
      }
    };
  }, [daySoundsEnabled]);

  return null;
};

export default SoundManager;
