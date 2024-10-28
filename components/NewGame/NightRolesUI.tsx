import React, { useContext, useEffect, useState } from "react";
import { View, Text, Pressable, Alert } from "react-native";
import { Audio } from "expo-av";
import NewGameContext from "@/contexts/NewGameContext";
import { Ionicons } from "@expo/vector-icons";

interface WakeUIProps {
  soundEnabled: boolean;
  playWerewolfAssistance?: (soundEnabled: boolean) => Promise<void>;
  playSeerAssistance?: (soundEnabled: boolean) => Promise<void>;
  playDoctorAssistance?: (soundEnabled: boolean) => Promise<void>;
}

// Wake Werewolf voice assistance
export function WakeWerewolfUI({ soundEnabled }: WakeUIProps) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [attackedPlayer, setAttackedPlayer] = useState(null);
  const {
    playersInGame,
    setPlayersInGame,
    selectedPlayersForElimination,
    setSelectedPlayersForElimination,
  } = useContext(NewGameContext);

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

  const handleChoosePlayer = () => {
    const eligiblePlayers = playersInGame.filter(
      (player: any) =>
        !["Werewolf", "Alpha Werewolf", "Wolf Cub", "Lycan"].includes(
          player.role
        )
    );

    const playerNames = eligiblePlayers.map((player: any) => player.name);

    Alert.alert("Choose Player to Attack", "", [
      ...playerNames.map((name: any) => ({
        text: name,
        onPress: () => {
          setAttackedPlayer(name);

          // Update attackedByWerewolves status for playersInGame
          setPlayersInGame((prevPlayers: any) =>
            prevPlayers.map((player: any) => ({
              ...player,
              attackedByWerewolves: player.name === name,
            }))
          );

          // Update selectedPlayersForElimination to include the attacked player
          const attackedPlayerObj = eligiblePlayers.find(
            (player: any) => player.name === name
          );
          if (attackedPlayerObj) {
            setSelectedPlayersForElimination([attackedPlayerObj]);
          }
        },
      })),
      { text: "Cancel", onPress: () => null },
    ]);
  };

  return (
    <View className="border-slate-500 rounded-lg p-3 border-[0.5px] my-1">
      <View className="flex-row gap-3 justify-center mt-1">
        <Text className="text-start w-[100%] text-white font-[16px] px-3">
          - Wake up the Werewolves and let them decide collectively who to
          eliminate this night.
        </Text>
      </View>

      <View className="flex-row items-center m-2">
        {/* Button for Werewolf voice assistance */}
        <Pressable
          className="bg-gray-700 p-2 rounded-lg mr-2"
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

        {/* Button to choose attacked player this night */}
        <Pressable
          className="bg-gray-700 p-3 rounded-lg "
          onPress={handleChoosePlayer}
        >
          {({ pressed }) => (
            <Text
              className={`text-[14px] font-bold text-white ${
                pressed ? "opacity-70" : "opacity-100"
              }`}
            >
              {attackedPlayer ? `Attacked: ${attackedPlayer}` : "Choose Player"}
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
    <View className="border-slate-500 rounded-lg p-3 border-[0.5px] my-1">
      <View className="flex-row items-center gap-3 justify-center mt-1">
        <Text className="text-start w-[100%] text-white font-[16px] px-3">
          - Wake up the Seer and let them choose someone from the village. You
          will let the Seer know if the chosen person is a good or bad role.
        </Text>
      </View>

      <View className="flex-row items-center m-2">
        {/* Button for Seer voice assistance */}
        <Pressable
          className="bg-gray-700 p-2 rounded-lg mr-2"
          onPress={handlePlaySeerAssistance}
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

// Wake Doctor voice assistance
export function WakeDoctorUI({ soundEnabled }: WakeUIProps) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [selectedPlayerName, setSelectedPlayerName] =
    useState<string>("Choose Player");
  const { playersInGame, setPlayersInGame } = useContext(NewGameContext);

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
    // Filter out the Doctor from the playersInGame array
    const availablePlayers = playersInGame.filter(
      (player: any) => player.role !== "Doctor"
    );

    const playerOptions = availablePlayers.map((player: any) => ({
      text: player.name,

      onPress: () => {
        // Clear previous protection by the Doctor
        playersInGame.forEach((p: any) => {
          if (p.protectedByDoctor) {
            p.protectedByDoctor = false;
          }
        });

        // Protect the new player
        player.protectedByDoctor = true;

        const updatedPlayers = playersInGame.map((p: any) => ({
          ...p,
          protectedByDoctor: p.name === player.name,
        }));
        setPlayersInGame(updatedPlayers); // Update context state

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
        <Text className="text-start w-[100%] text-white font-[16px] px-3">
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
  const { playersInGame, setPlayersInGame } = useContext(NewGameContext);

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
    // Filter out the Bodyguard from the playersInGame array
    const availablePlayers = playersInGame.filter(
      (player: any) => player.role !== "Bodyguard"
    );

    const playerOptions = availablePlayers.map((player: any) => ({
      text: player.name,

      onPress: () => {
        // Clear any previous Bodyguard protection
        playersInGame.forEach((p: any) => {
          if (p.protectedByBodyguard) {
            p.protectedByBodyguard = false;
            p.numberOfAttacks = 0;
          }
        });

        // Protect the new player
        player.protectedByBodyguard = true;
        player.numberOfAttacks = 0;

        // Updating the shield UI in the bottomSheet
        const updatedPlayers = playersInGame.map((p: any) => ({
          ...p,
          protectedByBodyguard: p.name === player.name,
        }));
        setPlayersInGame(updatedPlayers);

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
        <Text className="text-start w-[100%] text-white font-[16px] px-3">
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
