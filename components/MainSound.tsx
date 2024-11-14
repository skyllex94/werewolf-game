import React, { useEffect, useState, useContext } from "react";
import { Audio } from "expo-av";
import SoundContext from "@/contexts/SoundContext";

interface MainSoundManagerProps {
  soundtrackEnabled: boolean;
}

const MainSoundManager: React.FC<MainSoundManagerProps> = ({
  soundtrackEnabled,
}) => {
  const [soundtrack, setSoundtrack] = useState<Audio.Sound | null>(null);
  const { soundEnabled } = useContext(SoundContext)!;

  useEffect(() => {
    const playSounds = async () => {
      if (soundtrackEnabled) {
        // Play soundtrack
        const { sound: bgSound } = await Audio.Sound.createAsync(
          require("../assets/audio/bg_music/soundtrack.mp3"),
          { isLooping: true, volume: soundEnabled ? 0.3 : 0.0 }
        );
        setSoundtrack(bgSound);
        await bgSound.playAsync();
      } else {
        // Stop sounds when not on main screen
        if (soundtrack) {
          await soundtrack.stopAsync();
          await soundtrack.unloadAsync();
        }
      }
    };

    playSounds();

    // Cleanup on unmount or when mainScreenSounds changes
    return () => {
      if (soundtrack) {
        soundtrack.stopAsync();
        soundtrack.unloadAsync();
      }
    };
  }, [soundtrackEnabled]);

  // Adjust volume based on soundEnabled changes
  useEffect(() => {
    soundtrack?.setVolumeAsync(soundEnabled ? 0.3 : 0.0);
    // lightningSound?.setVolumeAsync(soundEnabled ? 0.2 : 0.0);
  }, [soundEnabled]); // lightningSound

  return null;
};

export default MainSoundManager;
