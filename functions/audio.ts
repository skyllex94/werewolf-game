import { Audio } from "expo-av";
import SoundContext from "@/contexts/SoundContext";
import { useContext } from "react";

const { soundEnabled } = useContext(SoundContext);

// Load and play the wolf howling sound
export async function playWolfHowling(
  setWolfHowling: React.Dispatch<React.SetStateAction<Audio.Sound | null>>
) {
  console.log("Loading Wolf Howling Sound");
  const { sound } = await Audio.Sound.createAsync(
    require("../assets/audio/wolf-howling.mp3"),
    { volume: soundEnabled ? 0.3 : 0.0 }
  );
  setWolfHowling(sound);

  // Check if the sound is loaded before playing
  if (sound) {
    await sound.playAsync();
  }
}
