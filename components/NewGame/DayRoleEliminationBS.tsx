import {
  View,
  Text,
  Pressable,
  Alert,
  Appearance,
  StyleSheet,
  Modal,
  Button,
} from "react-native";
import React, { useMemo, forwardRef, useContext, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import NewGameContext from "@/contexts/NewGameContext";
import { checkForWinner, truncate } from "@/functions/functions";
import { FontAwesome5 } from "@expo/vector-icons";

type RoleEliminatedBSProps = {
  setDaySoundsEnabled: any;
};

const DayEliminationBottomSheet = forwardRef<
  BottomSheet,
  RoleEliminatedBSProps
>((props, eliminatedRoleBSRef) => {
  const {
    setEliminatedPlayers,
    selectedPlayersForElimination,
    setSelectedPlayersForElimination,
    playersInGame,
    setPlayersInGame,
  } = useContext(NewGameContext);

  // State to toggle filtering
  const [hunterSelected, setHunterSelected] = useState<boolean>(false);

  const { setDaySoundsEnabled } = props;

  const snapPoints = useMemo(() => ["50%"], []);

  const togglePlayerSelection = (player: any) => {
    if (
      selectedPlayersForElimination.find((p: any) => p.order === player.order)
    ) {
      setSelectedPlayersForElimination(
        selectedPlayersForElimination.filter(
          (p: any) => p.order !== player.order
        )
      );
    } else {
      setSelectedPlayersForElimination([
        ...selectedPlayersForElimination,
        player,
      ]);
    }
  };

  function checkIfHunterSelected() {
    // Check if Hunter Eliminated
    if (!hunterSelected) {
      // Check if the eliminated role includes a Hunter
      const hunterEliminated = selectedPlayersForElimination.some(
        (player: any) => player.role === "Hunter"
      );

      if (hunterEliminated) {
        setHunterSelected(true);

        // Create an array of players left for selection
        const playersToChooseFrom = playersInGame.filter(
          (player: any) => player.role !== "Hunter"
        );

        // Prepare an alert to choose a player to eliminate
        const playerNames = playersToChooseFrom.map((p: any) => p.name);
        Alert.alert(
          "Hunter was eliminated!",
          "The Hunter gets to eliminate another player.",
          [
            ...playerNames.map((name: string, index: number) => ({
              text: name,
              onPress: () => {
                // Add selected player for elimination
                setSelectedPlayersForElimination((prev: any) => [
                  ...prev,
                  playersToChooseFrom[index],
                ]);
                Alert.alert(`${name} has been selected for elimination.`);
              },
            })),
            { text: "Cancel", onPress: () => null },
          ]
        );

        return true;
      }
    }
    return false;
  }

  // Function to check if Prince is in elimination list and filter them out
  const princeCheckup = (playersForElimination: any[]) => {
    const nonPrincePlayers = playersForElimination.filter(
      (player: any) => player.role !== "Prince"
    );

    // If a Prince was removed, display a message
    if (nonPrincePlayers.length !== playersForElimination.length) {
      Alert.alert(
        "Prince Protected",
        "The Prince cannot be removed during the day as the Village cannot vote him out."
      );
    }

    return nonPrincePlayers;
  };

  // Resetting marked as ready for player being selected
  // function updateMarkRolesAsReady() {
  //   markRoleAsReady("Werewolf", false);
  //   markRoleAsReady("Doctor", false);
  // }

  const confirmElimination = () => {
    // Prepare elimination message for the initial confirmation alert
    const eliminatedPlayerNames = selectedPlayersForElimination
      .map((player: any) => player.name)
      .join(", ");

    const playerLabel =
      selectedPlayersForElimination.length === 1 ? "Player" : "Players";

    const eliminationMessage = eliminatedPlayerNames
      ? `${playerLabel}: ${eliminatedPlayerNames} will be removed from the game.`
      : "No players will be removed from the game.";

    // Display the initial "Ready for the Night?" confirmation alert
    Alert.alert("Ready for the Night?", eliminationMessage, [
      {
        text: "Yes",
        onPress: () => {
          // Sound management states
          setDaySoundsEnabled(false);

          // Check if specific roles are in the selected players for elimination
          const isPrinceEliminated = selectedPlayersForElimination.some(
            (player: any) => player.role === "Prince"
          );
          const isWolfCubEliminated = selectedPlayersForElimination.some(
            (player: any) => player.role === "Wolf Cub"
          );

          // Apply Prince immunity if the Prince is selected for elimination
          if (isPrinceEliminated) {
            princeCheckup(selectedPlayersForElimination);
          }

          // Filter out players to keep only those not protected by the Prince
          const finalPlayersForElimination = playersInGame
            .map((player: any) => {
              // Set isEliminatedDuringDay to true for the Tanner if eliminated during the day
              if (
                player.role === "Tanner" &&
                selectedPlayersForElimination.includes(player)
              ) {
                return { ...player, isEliminatedDuringDay: true };
              }
              return player;
            })
            .filter(
              (player: any) =>
                !selectedPlayersForElimination.includes(player) ||
                (player.role === "Prince" &&
                  selectedPlayersForElimination.includes(player))
            );

          // Hunter role check
          const isHunterEliminated = checkIfHunterSelected();
          if (isHunterEliminated) {
            setPlayersInGame(finalPlayersForElimination);
            return;
          }

          // Clear selected players for the next round
          setSelectedPlayersForElimination([]);

          // Set to day context for checking win conditions
          const isDay = true;

          // Update playersInGame and eliminatedPlayers based on final selections
          setPlayersInGame(finalPlayersForElimination);
          setEliminatedPlayers((prevEliminated: any) => [
            ...prevEliminated,
            ...selectedPlayersForElimination.filter(
              (player: any) =>
                !(
                  player.role === "Prince" &&
                  selectedPlayersForElimination.includes(player)
                )
            ),
          ]);

          // Check for a winner after eliminations
          checkForWinner(finalPlayersForElimination, isDay);

          // Display message if a Wolf Cub was eliminated
          if (isWolfCubEliminated) {
            Alert.alert(
              "Wolf Cub Killed",
              "The Wolf Cub has been killed. Werewolves get an extra kill next night. Don't let the Village know that there was a Wolf Cub killed, simply let the Werewolves eliminate another player."
            );
          }
        },
      },
      { text: "No", onPress: () => null },
    ]);
  };

  return (
    <BottomSheet
      ref={eliminatedRoleBSRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      enableOverDrag={true}
      animateOnMount={true}
    >
      <View className="flex-1 items-center">
        <View className="flex-row items-center justify-center px-3 py-2 w-full">
          <Text className="text-[16px] font-light">
            Anyone eliminated this day?
          </Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          className="w-full mb-24"
        >
          <View className="flex-row flex-wrap justify-start p-2 w-full">
            {playersInGame.map((player: any) => (
              <View className="w-[33.3%] max-w-[33.3%]" key={player.order}>
                <TouchableOpacity
                  onPress={() => togglePlayerSelection(player)}
                  className={`rounded-lg p-3 m-1 mb-2 items-center ${
                    selectedPlayersForElimination.find(
                      (p: any) => p.order === player.order
                    )
                      ? "bg-green-300"
                      : "bg-gray-300"
                  }`}
                >
                  <View className="absolute left-2 top-[60%]">
                    {/* Display Bodyguarded Status only if Bodyguard is in the game */}
                    {playersInGame.some((p: any) => p.role === "Bodyguard") &&
                      player.protectedByBodyguard && (
                        <FontAwesome5
                          name="shield-alt"
                          size={18}
                          color="#636363"
                        />
                      )}
                  </View>
                  <Text className="font-bold">{truncate(player.name)}</Text>

                  <Text className="text-xs">{player.role}</Text>
                </TouchableOpacity>
              </View>
            ))}

            <View className="w-[33.3%] max-w-[33.3%]">
              <TouchableOpacity
                onPress={() => {
                  setSelectedPlayersForElimination([]);
                }}
                className={`rounded-lg p-3 m-1 mb-2 items-center ${
                  selectedPlayersForElimination.length === 0
                    ? "bg-green-300"
                    : "bg-gray-300"
                }`}
              >
                <Text className="font-bold text-center">
                  No Role Eliminated
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* Buttons Section */}
        <View className="w-full flex-row justify-between items-center absolute bottom-10 px-3 z-[-1]">
          {/* Confirm Button */}
          <Pressable
            className="bg-green-300 items-center justify-center border border-green-300 p-4
               w-[100%] rounded-xl"
            onPress={confirmElimination}
          >
            {({ pressed }) => (
              <Text
                className={`text-[16px] font-bold ${
                  pressed ? "opacity-70" : "opacity-100"
                }`}
              >
                Confirm
              </Text>
            )}
          </Pressable>
        </View>
      </View>
    </BottomSheet>
  );
});

export default DayEliminationBottomSheet;
