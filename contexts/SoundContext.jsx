import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    // Load sound settings from AsyncStorage when app starts
    const loadSoundSettings = async () => {
      const storedSoundSetting = await AsyncStorage.getItem("soundEnabled");
      if (storedSoundSetting !== null) {
        setSoundEnabled(JSON.parse(storedSoundSetting));
      }
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

  return (
    <SoundContext.Provider value={{ soundEnabled, setSoundEnabled }}>
      {children}
    </SoundContext.Provider>
  );
};

export default SoundContext;
