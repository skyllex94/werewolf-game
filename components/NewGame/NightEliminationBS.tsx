import { View, Text, Pressable, Alert } from "react-native";
import React, {
  useCallback,
  useMemo,
  forwardRef,
  useState,
  useContext,
} from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import NewGameContext from "@/contexts/NewGameContext";
import { checkForWinner, truncate } from "@/functions/functions";

type RoleEliminatedBSProps = {
  stopNightSounds: () => void;
};

const NightEliminationBS = forwardRef<BottomSheet, RoleEliminatedBSProps>(
  (props, eliminatedRoleBSRef) => {
    const {
      allPlayersInGame,
      eliminatedPlayers,
      setEliminatedPlayers,
      playersLeft,
      setPlayersLeft,
    } = useContext(NewGameContext);

    const [showAll, setShowAll] = useState(false); // State to toggle filtering

    const snapPoints = useMemo(() => ["50%"], []);

    const { stopNightSounds } = props;

    const openEliminatedBottomSheet = () => {
      if (eliminatedRoleBSRef && "current" in eliminatedRoleBSRef) {
        eliminatedRoleBSRef.current?.snapToIndex(0);
      }
    };

    const closeEliminatedRoleBS = useCallback(() => {
      if (eliminatedRoleBSRef && "current" in eliminatedRoleBSRef) {
        eliminatedRoleBSRef.current?.close();
      }
    }, [eliminatedRoleBSRef]);

    const togglePlayerSelection = (player: any) => {
      if (eliminatedPlayers.find((p: any) => p.order === player.order)) {
        setEliminatedPlayers(
          eliminatedPlayers.filter((p: any) => p.order !== player.order)
        );
      } else {
        setEliminatedPlayers([...eliminatedPlayers, player]);
      }
    };

    const confirmElimination = () => {
      const isDay = false;
      const eliminatedPlayerNames = eliminatedPlayers
        .map((player: any) => player.name)
        .join(", ");

      const playerLabel = eliminatedPlayers.length === 1 ? "Player" : "Players";

      const eliminationMessage = eliminatedPlayerNames
        ? `${playerLabel}: ${eliminatedPlayerNames} will be removed from the game.`
        : "No players will be removed from the game.";

      return Alert.alert("Ready for the Day?", eliminationMessage, [
        {
          text: "Yes",
          onPress: () => {
            const remainingPlayers = playersLeft.filter(
              (player: any) => !eliminatedPlayers.includes(player)
            );
            setPlayersLeft(remainingPlayers);
            stopNightSounds();

            checkForWinner(remainingPlayers, isDay);
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
              {playersLeft
                // Conditionally filter out Werewolves
                .filter((player: any) => showAll || player.role !== "Werewolf")
                .map((player: any) => (
                  <View className="w-[33.3%] max-w-[33.3%]" key={player.order}>
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

              <View className="w-[33.3%] max-w-[33.3%]">
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

          {/* Buttons Section */}
          <View className="w-full flex-row justify-between items-center absolute bottom-10 px-3 z-[-1]">
            {/* Confirm Button */}
            <Pressable
              className="bg-green-300 items-center justify-center border border-green-300 p-4 w-[65%] rounded-xl"
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
              border-transparent p-4 w-[32%] rounded-xl"
              onPress={toggleShowAll}
            >
              {({ pressed }) => (
                <Text
                  className={`text-[16px] font-bold ${
                    pressed ? "opacity-70" : "opacity-100"
                  }`}
                >
                  {showAll ? "No Wolves" : "Show All"}
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
