import { View, Text, Pressable, Alert, Image } from "react-native";
import React, { useMemo, forwardRef, useState, useContext } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import NewGameContext from "@/contexts/NewGameContext";
import { checkForWinner, truncate } from "@/functions/functions";
import {
  FontAwesome5,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

type RoleEliminatedBSProps = {
  stopNightSounds: () => void;
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
    } = useContext(NewGameContext);

    const [showAll, setShowAll] = useState(false);
    const [hunterSelected, setHunterSelected] = useState<boolean>(false);

    console.log(
      "selectedPlayersForElimination:",
      selectedPlayersForElimination
    );

    const snapPoints = useMemo(() => ["50%"], []);
    const { stopNightSounds } = props;

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
            // Actual removal excluding some conditions
            const finalPlayersForElimination = playersInGame.filter(
              (player: any) => !selectedPlayersForElimination.includes(player)
            );

            // Hunter role check
            const isHunterEliminated = checkIfHunterEliminated();
            if (isHunterEliminated) {
              // If a Hunter was eliminated, include their selected target
              setPlayersInGame(finalPlayersForElimination);
              return;
            }

            // Clear selected players for the next round
            setSelectedPlayersForElimination([]);

            const isDay = false;
            checkForWinner(finalPlayersForElimination, isDay);

            setPlayersInGame(finalPlayersForElimination);
            setEliminatedPlayers([
              ...eliminatedPlayers,
              ...selectedPlayersForElimination,
            ]);
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
              {/* Map through players and render them */}
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
                          ? "bg-green-300"
                          : "bg-gray-300"
                      }`}
                    >
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
                              color="#636363"
                              // Space between shields if multiple
                              style={{ marginBottom: 2 }}
                            />
                          )}
                        {playersInGame.some((p: any) => p.role === "Doctor") &&
                          player.protectedByDoctor && (
                            <FontAwesome6
                              name="user-doctor"
                              size={18}
                              color="#636363"
                            />
                          )}
                        {playersInGame.some((p: any) => p.role === "Priest") &&
                          player.protectedByPriest && (
                            <FontAwesome5
                              name="cross"
                              size={17}
                              color="#636363"
                            />
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
                              style={{ tintColor: "#3b3b3b" }}
                              source={require("../../assets/images/bottom_sheet/werewolf.png")}
                            />
                          )}
                      </View>
                      <Text className="font-bold">{truncate(player.name)}</Text>
                      <Text className="text-xs">{player.role}</Text>
                    </TouchableOpacity>
                  </View>
                ))}

              {/* No Role Eliminated Button */}
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
               w-[70%] rounded-xl"
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

            {/* Show All Button */}
            <Pressable
              className="bg-white items-center justify-center border 
              border-transparent p-4 w-[30%] rounded-xl"
              onPress={toggleShowAll}
            >
              {({ pressed }) => (
                <Text
                  className={`text-[16px] font-bold ${
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
