import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";

interface SoundContextProps {
  soundEnabled: boolean;
  setSoundEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  soundtrackEnabled: boolean;
  setSoundtrackEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  nightSoundsEnabled: boolean;
  setNightSoundsEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  daySoundsEnabled: boolean;
  setDaySoundsEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  winSoundEnabled: boolean;
  setWinSoundEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

const SoundContext = createContext<SoundContextProps | undefined>(undefined);

interface SoundProviderProps {
  children: ReactNode;
}

export const SoundProvider = ({ children }: SoundProviderProps) => {
  // Global volume control
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Background sound control states
  const [soundtrackEnabled, setSoundtrackEnabled] = useState(false);
  const [nightSoundsEnabled, setNightSoundsEnabled] = useState(false);
  const [daySoundsEnabled, setDaySoundsEnabled] = useState(false);
  const [winSoundEnabled, setWinSoundEnabled] = useState(false);

  // Soundtrack music state
  const [soundtrack, setSoundtrack] = useState<Audio.Sound | null>(null);

  // Night background music states
  const [wolfHowling, setWolfHowling] = useState<Audio.Sound | null>(null);
  const [nightBackgroundSound, setNightBackgroundSound] =
    useState<Audio.Sound | null>(null);

  // Day background music states
  const [backgroundSound, setBackgroundSound] = useState<Audio.Sound | null>(
    null
  );
  const [ambienceSound, setAmbienceSound] = useState<Audio.Sound | null>(null);

  // Win background state
  const [victorySound, setVictorySound] = useState<Audio.Sound | null>(null);

  useEffect(() => {
    const loadSoundSettings = async () => {
      const storedSoundSetting = await AsyncStorage.getItem("soundEnabled");
      if (storedSoundSetting !== null) {
        setSoundEnabled(JSON.parse(storedSoundSetting));
      }

      // Play the soundtrack after the AsyncStorage fetching is done
      setSoundtrackEnabled(true);
    };
    loadSoundSettings();
  }, []);

  // Save the sound setting to AsyncStorage whenever it changes
  useEffect(() => {
    const saveSoundSettings = async () => {
      await AsyncStorage.setItem("soundEnabled", JSON.stringify(soundEnabled));
    };
    saveSoundSettings();
  }, [soundEnabled]);

  // Soundtrack start & stop control
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

  useEffect(() => {
    const playSounds = async () => {
      if (nightSoundsEnabled) {
        const { sound: howlSound } = await Audio.Sound.createAsync(
          require("../assets/audio/wolf-howling.mp3"),
          { volume: soundEnabled ? 0.3 : 0.0 }
        );
        setWolfHowling(howlSound);
        await howlSound.playAsync();

        const { sound: bgSound } = await Audio.Sound.createAsync(
          require("../assets/audio/night-background.mp3"),
          { isLooping: true, volume: soundEnabled ? 0.1 : 0.0 }
        );
        setNightBackgroundSound(bgSound);
        await bgSound.playAsync();
      } else {
        if (wolfHowling) {
          await wolfHowling.stopAsync();
          await wolfHowling.unloadAsync();
          setWolfHowling(null);
        }
        if (nightBackgroundSound) {
          await nightBackgroundSound.stopAsync();
          await nightBackgroundSound.unloadAsync();
          setNightBackgroundSound(null);
        }
      }
    };

    playSounds();

    return () => {
      wolfHowling?.stopAsync();
      wolfHowling?.unloadAsync();
      nightBackgroundSound?.stopAsync();
      nightBackgroundSound?.unloadAsync();
    };
  }, [nightSoundsEnabled]);

  useEffect(() => {
    const playDaytimeSounds = async () => {
      if (daySoundsEnabled) {
        // Load and play the main background sound
        const { sound: bgSound } = await Audio.Sound.createAsync(
          require("../assets/audio/day-bg-sound.mp3"),
          { isLooping: true, volume: soundEnabled ? 0.1 : 0.0 }
        );
        setBackgroundSound(bgSound);
        await bgSound.playAsync();

        // Load and play the ambience sound
        const { sound: ambience } = await Audio.Sound.createAsync(
          require("../assets/audio/day-bg-ambience.mp3"),
          { isLooping: true, volume: soundEnabled ? 0.3 : 0.0 }
        );
        setAmbienceSound(ambience);
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
  }, [daySoundsEnabled]);

  // Winning sound controls
  useEffect(() => {
    const playSounds = async () => {
      if (winSoundEnabled) {
        // Play soundtrack
        const { sound: bgSound } = await Audio.Sound.createAsync(
          require("../assets/audio/bg_music/victory.mp3"),
          { isLooping: false, volume: soundEnabled ? 0.3 : 0.0 }
        );
        setVictorySound(bgSound);
        await bgSound.playAsync();
      } else {
        // Stop sounds when not on main screen
        if (victorySound) {
          await victorySound.stopAsync();
          await victorySound.unloadAsync();
        }
      }
    };

    playSounds();

    // Cleanup on unmount
    return () => {
      if (victorySound) {
        victorySound.stopAsync();
        victorySound.unloadAsync();
      }
    };
  }, [winSoundEnabled]);

  useEffect(() => {
    // Soundtrack sound
    soundtrack?.setVolumeAsync(soundEnabled ? 0.3 : 0.0);

    // Night sounds
    wolfHowling?.setVolumeAsync(soundEnabled ? 0.3 : 0.0);
    nightBackgroundSound?.setVolumeAsync(soundEnabled ? 0.1 : 0.0);

    // Day sounds
    backgroundSound?.setVolumeAsync(soundEnabled ? 0.1 : 0.0);
    ambienceSound?.setVolumeAsync(soundEnabled ? 0.1 : 0.0);

    // Win sound
    victorySound?.setVolumeAsync(soundEnabled ? 0.2 : 0.0);
  }, [soundEnabled]);

  return (
    <SoundContext.Provider
      value={{
        soundEnabled,
        setSoundEnabled,
        soundtrackEnabled,
        setSoundtrackEnabled,
        nightSoundsEnabled,
        setNightSoundsEnabled,
        daySoundsEnabled,
        setDaySoundsEnabled,
        winSoundEnabled,
        setWinSoundEnabled,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export default SoundContext;
