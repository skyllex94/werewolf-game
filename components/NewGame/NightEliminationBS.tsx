import { View, Text, Pressable, Alert, Image, StyleSheet } from "react-native";
import React, { useMemo, forwardRef, useState, useContext } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import NewGameContext from "@/contexts/NewGameContext";
import { checkForWinner, truncate } from "@/functions/functions";
import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
} from "@expo/vector-icons";
import SoundContext from "@/contexts/SoundContext";

type RoleEliminatedBSProps = {
  isFirstNight: boolean | undefined;
};

const NightEliminationBS = forwardRef<BottomSheet, RoleEliminatedBSProps>(
  (props, eliminatedRoleBSRef) => {
    const {
      eliminatedPlayers,
      setEliminatedPlayers,
      selectedPlayersForElimination,
      setSelectedPlayersForElimination,
      playersInGame,
      setPlayersInGame,
      setWitchProtectionUsed,
    } = useContext(NewGameContext);

    const [showAll, setShowAll] = useState(false);
    const [hunterSelected, setHunterSelected] = useState<boolean>(false);
    const { setNightSoundsEnabled, setDaySoundsEnabled } =
      useContext(SoundContext);

    const snapPoints = useMemo(() => ["50%"], []);

    const togglePlayerSelection = (player: any) => {
      const isAlreadySelected = selectedPlayersForElimination.some(
        (p: any) => p.order === player.order
      );

      // Check if the player is bonded by Cupid
      const bondedPlayer = player.bondedByCupid
        ? playersInGame.find(
            (p: any) => p.bondedByCupid && p.order !== player.order
          )
        : null;

      if (isAlreadySelected) {
        // Remove both the player and their bonded player (if bonded)
        setSelectedPlayersForElimination(
          selectedPlayersForElimination.filter(
            (p: any) =>
              p.order !== player.order &&
              (!bondedPlayer || p.order !== bondedPlayer.order)
          )
        );
      } else {
        // Add both the player and their bonded player (if bonded)
        setSelectedPlayersForElimination([
          ...selectedPlayersForElimination,
          player,
          ...(bondedPlayer ? [bondedPlayer] : []),
        ]);

        // Show alert if a bonded player was automatically selected
        if (bondedPlayer) {
          Alert.alert(
            "Cupid's Bond",
            `${player.name} is bonded by the Cupid with ${bondedPlayer.name}. Both have been selected for elimination.`
          );
        }
      }
    };

    function checkIfHunterEliminated() {
      if (!hunterSelected) {
        const hunterEliminated = selectedPlayersForElimination.some(
          (player: any) => player.role === "Hunter"
        );

        if (hunterEliminated) {
          setHunterSelected(true);

          const playersToChooseFrom = playersInGame.filter(
            (player: any) => player.role !== "Hunter"
          );

          const playerNames = playersToChooseFrom.map((p: any) => p.name);
          Alert.alert(
            "Hunter was eliminated!",
            "The Hunter gets to eliminate another player.",
            [
              ...playerNames.map((name: string, index: number) => ({
                text: name,
                onPress: () => {
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

    const confirmElimination = () => {
      const eliminatedNames = selectedPlayersForElimination
        .map((player: any) => player.name)
        .join(", ");
      const eliminationMessage = eliminatedNames
        ? `Players: ${eliminatedNames} will be removed from the game.`
        : "No players will be removed from the game.";

      Alert.alert("Ready for the Day?", eliminationMessage, [
        {
          text: "Yes",
          onPress: () => {
            // Sound management states
            setNightSoundsEnabled(false);
            // setDaySoundsEnabled(true);

            // Check if any player is protected by the Witch
            const isProtectedByWitch = playersInGame.some(
              (player: any) => player.protectedByWitch
            );

            // Disable future "Save a Player" actions if Witch has used protection
            if (isProtectedByWitch) {
              setWitchProtectionUsed(true);
            }

            const finalPlayersForElimination = playersInGame
              .map((player: any) => {
                // Transform Cursed Villager if selected by the village (not Hunter or Witch)
                if (
                  player.role === "Cursed Villager" &&
                  selectedPlayersForElimination.includes(player) &&
                  !player.attackedByWitch
                ) {
                  Alert.alert(
                    "Cursed Villager Transformed",
                    `${player.name} was a Cursed Villager and has now transformed into a Werewolf!`
                  );
                  return { ...player, role: "Werewolf", type: "bad" };
                }
                return player;
              })
              .filter(
                (player: any) =>
                  player && !selectedPlayersForElimination.includes(player)
              );

            // Hunter role check
            const isHunterEliminated = checkIfHunterEliminated();
            if (isHunterEliminated) {
              // If a Hunter was eliminated, include their selected target
              setPlayersInGame(finalPlayersForElimination);
              return;
            }

            const isDay = false;

            // Set the final players state
            checkForWinner(finalPlayersForElimination, isDay);

            setPlayersInGame(finalPlayersForElimination);
            setEliminatedPlayers([
              ...eliminatedPlayers,
              ...selectedPlayersForElimination,
            ]);

            // Clear selected players for the next round
            setSelectedPlayersForElimination([]);
          },
        },
        { text: "No", onPress: () => null },
      ]);
    };

    const toggleShowAll = () => {
      setShowAll(!showAll);
    };

    return (
      <BottomSheet
        ref={eliminatedRoleBSRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        enableOverDrag={true}
        animateOnMount={true}
        handleIndicatorStyle={{
          backgroundColor: "white", // Set the color to black
          width: 40, // Optional: Adjust width
          height: 5, // Optional: Adjust height for visibility
          borderRadius: 2.5, // Optional: Make it more rounded
        }}
        handleStyle={{
          backgroundColor: "#1F2937", // Dark background for the top area
          borderTopLeftRadius: 16, // Rounded corners for the top-left edge
          borderTopRightRadius: 16, // Rounded corners for the top-right edge
        }}
      >
        <View className="flex-1 items-center bg-gray-800">
          <View className="flex-row items-center justify-center px-3 py-2 w-full">
            <Text className="text-[16px] font-light text-white">
              Anyone eliminated this night?
            </Text>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            className="w-full mb-24"
          >
            <View className="flex-row flex-wrap justify-start p-2 w-full">
              {playersInGame
                .filter((player: any) => showAll || player.role !== "Werewolf")
                .map((player: any) => (
                  <View className="w-[33.3%] max-w-[33.3%]" key={player.order}>
                    <TouchableOpacity
                      onPress={() => togglePlayerSelection(player)}
                      className={`rounded-lg p-3 m-1 mb-2 items-center relative ${
                        selectedPlayersForElimination.find(
                          (p: any) => p.order === player.order
                        )
                          ? "bg-green-600"
                          : "bg-gray-700"
                      }`}
                    >
                      {/* Left-side Icons */}
                      <View
                        style={{
                          alignItems: "center",
                          position: "absolute",
                          top: 10,
                          left: "20%",
                          transform: [{ translateX: -10 }],
                        }}
                      >
                        {playersInGame.some(
                          (p: any) => p.role === "Bodyguard"
                        ) &&
                          player.protectedByBodyguard && (
                            <FontAwesome5
                              name="shield-alt"
                              size={17}
                              color="white"
                              // Space between shields if multiple
                              style={{ marginBottom: 2 }}
                            />
                          )}
                        {playersInGame.some((p: any) => p.role === "Doctor") &&
                          player.protectedByDoctor && (
                            <FontAwesome6
                              name="user-doctor"
                              size={18}
                              color="white"
                            />
                          )}
                        {playersInGame.some((p: any) => p.role === "Priest") &&
                          player.protectedByPriest && (
                            <FontAwesome5
                              name="cross"
                              size={17}
                              color="white" // #636363
                            />
                          )}
                        {playersInGame.some((p: any) => p.role === "Witch") &&
                          player.protectedByWitch && (
                            <View className="flex-row">
                              <Image
                                className="w-[20px] h-[20px]"
                                source={require("../../assets/images/bottom_sheet/witch.png")}
                                style={{ tintColor: "white" }}
                              />
                              <View className="absolute top-0 right-[-6]">
                                <FontAwesome
                                  name="check"
                                  size={10}
                                  color="green"
                                />
                              </View>
                            </View>
                          )}
                      </View>

                      <View
                        style={{
                          alignItems: "center",
                          position: "absolute",
                          top: 10,
                          right: "0%",
                          transform: [{ translateX: -10 }],
                        }}
                      >
                        {playersInGame.some(
                          (p: any) => p.role === "Werewolf"
                        ) &&
                          player.attackedByWerewolves && (
                            <Image
                              className="w-[20px] h-[20px]"
                              style={{ tintColor: "white" }}
                              source={require("../../assets/images/bottom_sheet/werewolf.png")}
                            />
                          )}

                        {player.bondedByCupid && (
                          <AntDesign name="heart" size={17} color="white" />
                        )}

                        {playersInGame.some((p: any) => p.role === "Witch") &&
                          player.attackedByWitch && (
                            <View className="flex-row">
                              <Image
                                className="w-[20px] h-[20px]"
                                source={require("../../assets/images/bottom_sheet/witch.png")}
                                style={{ tintColor: "white" }}
                              />
                              <View className="absolute top-0 right-[-6]">
                                <FontAwesome
                                  name="close"
                                  size={10}
                                  color="red"
                                />
                              </View>
                            </View>
                          )}
                      </View>
                      <Text className="text-white font-bold">
                        {truncate(player.name)}
                      </Text>
                      <Text className="text-xs text-slate-300">
                        {player.role}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}

              {/* No Role Eliminated Button */}
              <View className="w-[33.3%] max-w-[33.3%]">
                <TouchableOpacity
                  onPress={() => setSelectedPlayersForElimination([])}
                  className={`rounded-lg p-3 m-1 mb-2 items-center ${
                    selectedPlayersForElimination.length === 0
                      ? "bg-green-600"
                      : "bg-gray-700"
                  }`}
                >
                  <Text className="font-bold text-white text-center">
                    No Role Eliminated
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>

          <View className="w-full flex-row justify-between items-center absolute bottom-10 px-3">
            <Pressable
              className="bg-green-600 items-center justify-center border border-green-700 p-4 w-[68%] rounded-xl"
              onPress={confirmElimination}
            >
              {({ pressed }) => (
                <Text
                  className={`text-[16px] font-bold text-white ${
                    pressed ? "opacity-70" : "opacity-100"
                  }`}
                >
                  Confirm
                </Text>
              )}
            </Pressable>

            <Pressable
              className="bg-gray-700 m-2 items-center justify-center border border-gray-700 p-4 w-[30%] rounded-xl"
              onPress={toggleShowAll}
            >
              {({ pressed }) => (
                <Text
                  className={`text-[16px] font-bold text-white ${
                    pressed ? "opacity-70" : "opacity-100"
                  }`}
                >
                  {showAll ? "Show Less" : "Show All"}
                </Text>
              )}
            </Pressable>
          </View>
        </View>
      </BottomSheet>
    );
  }
);

export default NightEliminationBS;
