import React, { useContext, useEffect, useState } from "react";
import { View, Text, Pressable, Alert, Image } from "react-native";
import { Audio } from "expo-av";
import NewGameContext from "@/contexts/NewGameContext";
import {
  AntDesign,
  FontAwesome5,
  FontAwesome6,
  Ionicons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface WakeUIProps {
  soundEnabled: boolean;
  playWerewolfAssistance?: (soundEnabled: boolean) => Promise<void>;
  playSeerAssistance?: (soundEnabled: boolean) => Promise<void>;
  playDoctorAssistance?: (soundEnabled: boolean) => Promise<void>;
}

// Wake Werewolf UI
export function WakeWerewolfUI({ soundEnabled }: WakeUIProps) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [attackedPlayer, setAttackedPlayer] = useState(null);
  const { playersInGame, setPlayersInGame, setSelectedPlayersForElimination } =
    useContext(NewGameContext);

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
      <View className="flex-row items-start mx-1 mt-2">
        <Image
          className="w-[21px] h-[21px]"
          style={{ tintColor: "white" }}
          source={require("../../assets/images/bottom_sheet/werewolf.png")}
        />
        <Text className="text-white text-[15px] mx-2 mt-[2px]">
          Werewolf Role
        </Text>
      </View>
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

// Wake Seer UI
export function WakeSeerUI({ soundEnabled }: WakeUIProps) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const router = useRouter();

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
      <View className="flex-row items-start mx-1 mt-2">
        <AntDesign name="eye" size={20} color="white" />
        <Text className="text-white text-[15px] mx-2">Seer Role</Text>
      </View>

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

        {/* Button for View Roles */}
        <Pressable
          className="bg-gray-700 p-3 rounded-lg"
          onPress={() => router.push("/roles_modal")}
        >
          {({ pressed }) => (
            <Text
              className={`text-[14px] font-bold text-white ${
                pressed ? "opacity-70" : "opacity-100"
              }`}
            >
              View Roles
            </Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}

// Wake Doctor UI
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
      <View className="flex-row items-start mx-1 mt-2">
        <FontAwesome6 name="user-doctor" size={18} color="white" />
        <Text className="text-white text-[15px] mx-2">Doctor Role</Text>
      </View>

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

// Wake Bodyguard UI
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
      <View className="flex-row items-start mx-1 mt-2">
        <FontAwesome5 name="shield-alt" size={17} color="white" />
        <Text className="text-white text-[15px] mx-2">Bodyguard Role</Text>
      </View>
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

// Wake Priest UI
export function WakePriestUI({ soundEnabled }: WakeUIProps) {
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

  const playPriestAssistance = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/audio/assists/priest-assist.mp3"),
      { volume: soundEnabled ? 0.7 : 0.0 }
    );
    setSound(sound);
    await sound.playAsync();
  };

  const chooseBlessedPlayer = () => {
    // Filter out the Priest from the playersInGame array
    const availablePlayers = playersInGame.filter(
      (player: any) => player.role !== "Priest"
    );

    const playerOptions = availablePlayers.map((player: any) => ({
      text: player.name,
      onPress: () => {
        // Clear any previous Priest blessings
        playersInGame.forEach((p: any) => {
          if (p.protectedByPriest) {
            p.protectedByPriest = false;
          }
        });

        // Bless the new player
        player.protectedByPriest = true;

        // Updating the UI in the bottomSheet
        const updatedPlayers = playersInGame.map((p: any) => ({
          ...p,
          protectedByPriest: p.name === player.name,
        }));
        setPlayersInGame(updatedPlayers);

        // Set the selected player's name in the state
        setSelectedPlayerName(`Blessed: ${player.name}`);
      },
    }));

    // Add a cancel button to the alert
    playerOptions.push({
      text: "Cancel",
      style: "cancel",
    });

    // Show the alert
    Alert.alert("Choose Player to Bless", "Select one player", playerOptions);
  };

  return (
    <View className="border-slate-500 rounded-lg p-3 border-[0.5px] my-1">
      <View className="flex-row items-start mx-1 mt-2">
        <FontAwesome5 name="cross" size={17} color="white" />
        <Text className="text-white text-[15px] mx-2">Priest Role</Text>
      </View>
      <View className="flex-row items-center gap-3 justify-center mt-1">
        <Text className="text-start w-[100%] text-white font-[16px] px-3">
          - Wake up the Priest. They may bless one player, protecting them from
          one werewolf attack.
        </Text>
      </View>
      <View className="flex-row items-center m-2">
        {/* Button for Priest voice assistance */}
        <Pressable
          className="bg-gray-700 p-2 rounded-lg mr-2"
          onPress={playPriestAssistance}
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
          onPress={chooseBlessedPlayer}
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

// Wake Witch UI
export function WakeWitchUI({ soundEnabled }: WakeUIProps) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [saveButtonText, setSaveButtonText] = useState<string>("Save a Player");
  const [killButtonText, setKillButtonText] = useState<string>("Kill a Player");
  const {
    playersInGame,
    setPlayersInGame,
    eliminatedPlayers,
    witchProtectionUsed,
  } = useContext(NewGameContext);
  const [savedPlayer, setSavedPlayer] = useState<any>(null);
  const [killedPlayer, setKilledPlayer] = useState<any>(null);

  // Check conditions for disabling button
  const disableKillButton = eliminatedPlayers.some(
    (player: any) => player.attackedByWitch
  );

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

  const handlePlayWitchAssistance = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/audio/assists/witch-assist.mp3"),
      { volume: soundEnabled ? 0.7 : 0.0 }
    );
    setSound(sound);
    await sound.playAsync();
  };

  const choosePlayerToSave = () => {
    const availablePlayers = playersInGame.filter(
      (player: any) => player.role !== "Witch"
    );

    const playerOptions = availablePlayers.map((player: any) => ({
      text: player.name,
      onPress: () => {
        // Reset killed player if it exists
        if (killedPlayer) {
          setKilledPlayer(null);
          setKillButtonText("Kill a Player");
        }

        // Update player properties in playersInGame
        setPlayersInGame((prevPlayers: any) =>
          prevPlayers.map((p: any) => ({
            ...p,
            protectedByWitch: p.order === player.order, // Set only selected player as protected
            attackedByWitch: false, // Reset attackedByWitch for all
          }))
        );

        setSavedPlayer(player);
        setSaveButtonText(`Saved: ${player.name}`);
      },
    }));

    playerOptions.push({
      text: "Cancel",
      style: "cancel",
    });

    Alert.alert("Choose Player to Save", "Select one player", playerOptions);
  };

  const choosePlayerToKill = () => {
    if (disableKillButton) return;

    const availablePlayers = playersInGame.filter(
      (player: any) => player.role !== "Witch"
    );

    const playerOptions = availablePlayers.map((player: any) => ({
      text: player.name,
      onPress: () => {
        // Reset saved player if it exists
        if (savedPlayer) {
          setSavedPlayer(null);
          setSaveButtonText("Save a Player");
        }

        // Update player properties in playersInGame
        setPlayersInGame((prevPlayers: any) =>
          prevPlayers.map((p: any) => ({
            ...p,
            attackedByWitch: p.order === player.order, // Set only selected player as attacked
            protectedByWitch: false, // Reset protectedByWitch for all
          }))
        );

        setKilledPlayer(player);
        setKillButtonText(`Attacked: ${player.name}`);
      },
    }));

    playerOptions.push({
      text: "Cancel",
      style: "cancel",
    });

    Alert.alert("Choose Player to Kill", "Select one player", playerOptions);
  };

  return (
    <View className="border-slate-500 rounded-lg p-3 border-[0.5px] my-1">
      <View className="flex-row items-start mx-1 mt-2">
        <Image
          className="w-[25px] h-[25px]"
          source={require("../../assets/images/bottom_sheet/witch.png")}
          style={{ tintColor: "white" }}
        />
        <Text className="text-white text-[15px] mx-2 mt-[5px]">Witch Role</Text>
      </View>
      <View className="flex-row items-center gap-3 justify-center mt-1">
        <Text className="text-start w-[100%] text-white font-[16px] px-3">
          - Wake up the Witch. The Werewolves have chosen someone to attack. She
          may choose to use her potion to save this player from death. She also
          has a poison potion, which she may use once on any player of her
          choosing.
        </Text>
      </View>
      <View className="flex-row items-center m-2">
        <Pressable
          className="bg-gray-700 p-2 rounded-lg mr-2"
          onPress={handlePlayWitchAssistance}
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

        <Pressable
          className={`bg-gray-700 p-3 rounded-lg mr-2 ${
            witchProtectionUsed ? "opacity-70" : ""
          }`}
          onPress={witchProtectionUsed ? undefined : choosePlayerToSave}
          disabled={witchProtectionUsed}
        >
          <Text
            className={`text-[14px] font-bold text-white ${
              witchProtectionUsed ?? "opacity-100"
            }`}
          >
            {saveButtonText}
          </Text>
        </Pressable>

        <Pressable
          className={`bg-gray-700 p-3 rounded-lg ${
            disableKillButton ? "opacity-70" : ""
          }`}
          onPress={disableKillButton ? undefined : choosePlayerToKill}
          disabled={disableKillButton}
        >
          <Text className="text-[14px] font-bold text-white">
            {killButtonText}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

export function AlphaWerewolfUI({ soundEnabled }: WakeUIProps) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const {
    playersInGame,
    setPlayersInGame,
    convertedByAlphaWerewolf,
    setConvertedByAlphaWerewolf,
  } = useContext(NewGameContext);

  // Function to play sound for Alpha Werewolf
  const handlePlayAlphaAssistance = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/audio/assists/alpha-werewolf-assist.mp3"),
      { volume: soundEnabled ? 0.7 : 0.0 }
    );
    setSound(sound);
    await sound.playAsync();
  };

  // Function to choose a player to convert
  const choosePlayerToConvert = () => {
    const availablePlayers = playersInGame.filter(
      (player: any) => player.role !== "Alpha Werewolf"
    );

    const playerOptions = availablePlayers.map((player: any) => ({
      text: player.name,
      onPress: () => {
        // Show confirmation alert before converting
        Alert.alert(
          "Convert to Werewolf",
          `Are you sure you want to convert ${player.name} into a Werewolf?`,
          [
            {
              text: "Yes",
              onPress: () => {
                // Update the player's role to Werewolf
                setPlayersInGame((prevPlayers: any) =>
                  prevPlayers.map((p: any) =>
                    p.order === player.order ? { ...p, role: "Werewolf" } : p
                  )
                );
                setConvertedByAlphaWerewolf(player.name); // Set the converted player's name
                Alert.alert(
                  "Success!",
                  `${player.name} has been converted to a Werewolf!`
                );
              },
            },
            {
              text: "No",
            },
          ]
        );
      },
    }));

    playerOptions.push({
      text: "Cancel",
      style: "cancel",
    });

    Alert.alert("Choose Player to Convert", "Select one player", playerOptions);
  };

  return (
    <View className="border-slate-500 rounded-lg p-3 border-[0.5px] my-1">
      <View className="flex-row items-start mx-1 mt-2">
        <Image
          className="w-[25px] h-[25px]"
          source={require("../../assets/images/bottom_sheet/alpha-werewolf.png")}
          style={{ tintColor: "white" }}
        />
        <Text className="text-white text-[15px] mx-2 mt-[5px]">
          Alpha Werewolf Role
        </Text>
      </View>
      <View className="flex-row items-center gap-3 justify-center mt-1">
        <Text className="text-start w-[100%] text-white font-[16px] px-3">
          - Wake up the Alpha Werewolf. The Alpha has the ability to convert one
          villager into a Werewolf each night.
        </Text>
      </View>
      <View className="flex-row items-center m-2">
        <Pressable
          className="bg-gray-700 p-2 rounded-lg mr-2"
          onPress={handlePlayAlphaAssistance}
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

        <Pressable
          className={`bg-gray-700 p-3 rounded-lg mr-2 ${
            convertedByAlphaWerewolf ? "opacity-70" : ""
          }`}
          onPress={choosePlayerToConvert}
          disabled={!!convertedByAlphaWerewolf} // Disable button if player is converted
        >
          <Text className="text-[14px] font-bold text-white">
            {convertedByAlphaWerewolf
              ? `Converted to Werewolf: ${convertedByAlphaWerewolf}`
              : "Choose a Player"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
