import { View, Text, Pressable, Alert } from "react-native";
import React, { useCallback, useMemo, forwardRef, useContext } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import NewGameContext from "@/contexts/NewGameContext";
import { truncate } from "@/functions/functions";
import { useRouter } from "expo-router";

type RoleEliminatedBSProps = {
  setDayTimeSounds: any;
};

const DayEliminationBottomSheet = forwardRef<
  BottomSheet,
  RoleEliminatedBSProps
>((props, eliminatedRoleBSRef) => {
  const {
    // Eliminated players by the werewolves
    eliminatedPlayers,
    setEliminatedPlayers,
    // allPlayersInGame - eliminatedPlayers = playersLeft
    playersLeft,
    setPlayersLeft,
  } = useContext(NewGameContext);

  const router = useRouter();
  const { setDayTimeSounds } = props;

  // Bottom sheet properties
  const snapPoints = useMemo(() => ["50%"], []);

  const openEliminatedBottomSheet = () => {
    if (eliminatedRoleBSRef && "current" in eliminatedRoleBSRef) {
      eliminatedRoleBSRef.current?.snapToIndex(0); // Open halfway
    }
  };

  // Function to close the Bottom Sheet
  const closeEliminatedRoleBS = useCallback(() => {
    if (eliminatedRoleBSRef && "current" in eliminatedRoleBSRef) {
      eliminatedRoleBSRef.current?.close();
    }
  }, [eliminatedRoleBSRef]);

  // Function to toggle player selection
  const togglePlayerSelection = (player: any) => {
    if (eliminatedPlayers.find((p: any) => p.order === player.order)) {
      // If already selected, remove from selection
      setEliminatedPlayers(
        eliminatedPlayers.filter((p: any) => p.order !== player.order)
      );
    } else {
      // Otherwise, add to selection
      setEliminatedPlayers([...eliminatedPlayers, player]);
    }
  };

  // Function to confirm the eliminations and update playersLeft
  const confirmEliminations = () => {
    confirmActions();
  };

  function confirmActions() {
    const eliminatedPlayerNames = eliminatedPlayers
      .map((player: any) => player.name)
      .join(", ");

    // Determine if it's "Player" or "Players"
    const playerLabel = eliminatedPlayers.length === 1 ? "Player" : "Players";

    // If no players are eliminated, show a different message
    const eliminationMessage = eliminatedPlayerNames
      ? `${playerLabel}: ${eliminatedPlayerNames} will be removed from the game.`
      : "No players will be removed from the game.";

    return Alert.alert("Ready for the Night?", eliminationMessage, [
      {
        text: "Yes",
        onPress: () => {
          const remainingPlayers = playersLeft.filter(
            (player: any) => !eliminatedPlayers.includes(player)
          );
          setPlayersLeft(remainingPlayers);
          console.log("Players left:", remainingPlayers);

          // Shut down all audio from the day time
          setDayTimeSounds(false);

          router.push({
            pathname: "/night_time",
          });
        },
      },
      { text: "No", onPress: () => null },
    ]);
  }

  return (
    <BottomSheet
      ref={eliminatedRoleBSRef}
      index={-1} // Initially closed
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      enableOverDrag={true}
      animateOnMount={true}
    >
      <View className="flex-1 items-center">
        <View className="flex-row items-center justify-center px-3 py-2 w-full">
          <Text className="text-[16px] font-light">
            Anyone eliminated throughout the day?
          </Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} className="mb-24">
          <View className="flex-row flex-wrap justify-start p-2 w-full">
            {playersLeft
              // Filter out Werewolves
              .filter((player: any) => player.role !== "Werewolf")
              .map((player: any) => (
                <View className="w-[33.3%]" key={player.order}>
                  <TouchableOpacity
                    onPress={() => togglePlayerSelection(player)}
                    className={`rounded-lg p-3 m-1 mb-2 items-center ${
                      eliminatedPlayers.find(
                        (p: any) => p.order === player.order
                      )
                        ? "bg-green-300"
                        : "bg-gray-300"
                    }`}
                  >
                    <Text className="font-bold">{truncate(player.name)}</Text>
                    <Text className="text-xs">{player.role}</Text>
                  </TouchableOpacity>
                </View>
              ))}

            {/* "No Role Eliminated" Button */}
            <View className="w-[33.3%]">
              <TouchableOpacity
                onPress={() => {
                  setEliminatedPlayers([]);
                }}
                className={`rounded-lg p-3 m-1 mb-2 items-center ${
                  eliminatedPlayers.length === 0
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

        {/* Confirm Button */}
        <View className="w-full items-center absolute bottom-10 z-[-1]">
          <Pressable
            className="bg-green-300 items-center justify-center p-4 w-[95%] rounded-xl"
            onPress={confirmEliminations} // Confirm eliminations when pressed
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
