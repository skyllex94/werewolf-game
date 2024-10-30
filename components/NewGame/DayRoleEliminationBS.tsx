import { View, Text, Pressable, Alert } from "react-native";
import React, { useMemo, forwardRef, useContext, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import NewGameContext from "@/contexts/NewGameContext";
import { checkForWinner, truncate } from "@/functions/functions";
import { FontAwesome5 } from "@expo/vector-icons";

type RoleEliminatedBSProps = {
  setDayTimeSounds: any;
};

const DayEliminationBottomSheet = forwardRef<
  BottomSheet,
  RoleEliminatedBSProps
>((props, eliminatedRoleBSRef) => {
  const {
    eliminatedPlayers,
    setEliminatedPlayers,
    selectedPlayersForElimination,
    setSelectedPlayersForElimination,
    playersInGame,
    setPlayersInGame,
  } = useContext(NewGameContext);

  // State to toggle filtering
  const [hunterSelected, setHunterSelected] = useState<boolean>(false);
  const { allPlayersInGame } = useContext(NewGameContext);

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
  const checkAndRemovePrince = (playersForElimination: any[]) => {
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

  const confirmElimination = () => {
    const isDay = true;

    // Prepare elimination message for the initial confirmation alert
    const eliminatedPlayerNames = selectedPlayersForElimination
      .map((player: any) => player.name)
      .join(", ");

    const playerLabel =
      selectedPlayersForElimination.length === 1 ? "Player" : "Players";

    const eliminationMessage = eliminatedPlayerNames
      ? `${playerLabel}: ${eliminatedPlayerNames} will be removed from the game.`
      : "No players will be removed from the game.";

    // Display the initial "Ready for the Day?" confirmation alert
    Alert.alert("Ready for the Day?", eliminationMessage, [
      {
        text: "Yes",
        onPress: () => {
          // Check if the Tanner is in selectedPlayersForElimination
          const isTannerEliminated = selectedPlayersForElimination.some(
            (player: any) => player.role === "Tanner"
          );

          // Filter out the Prince and display the Prince protection message if applicable
          const finalPlayersForElimination = checkAndRemovePrince(
            selectedPlayersForElimination
          );

          const remainingPlayers = playersInGame.filter(
            (player: any) => !finalPlayersForElimination.includes(player)
          );

          // Hunter role check
          const isHunterEliminated = checkIfHunterSelected();
          if (isHunterEliminated) {
            setPlayersInGame(remainingPlayers);
            return;
          }

          // Clear selected players for the next round
          setSelectedPlayersForElimination([]);

          const isDay = true;
          // If Tanner is eliminated, he wins as an independent
          if (isTannerEliminated) {
            checkForWinner(remainingPlayers, isDay, allPlayersInGame);
            return; // Exit as the game is won by Tanner
          }
          checkForWinner(remainingPlayers, isDay, allPlayersInGame);

          setPlayersInGame(remainingPlayers);
          setEliminatedPlayers([
            ...eliminatedPlayers,
            ...finalPlayersForElimination,
          ]);
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
            Anyone eliminated this night?
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
