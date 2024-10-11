import { View, Text, Pressable } from "react-native";
import React, {
  useCallback,
  useMemo,
  forwardRef,
  useContext,
  useState,
} from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import NewGameContext from "@/contexts/NewGameContext";
import { truncate } from "@/functions/functions";

type RoleEliminatedBSProps = {};

const RoleEliminatedBS = forwardRef<BottomSheet, RoleEliminatedBSProps>(
  (props, eliminatedRoleBSRef) => {
    const { playersRoles } = useContext(NewGameContext);

    // State to keep track of selected eliminated players and players left
    const [eliminatedPlayers, setEliminatedPlayers] = useState<any[]>([]);
    const [playersLeft, setPlayersLeft] = useState<any[]>(playersRoles); // Initially, all players are left

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
      if (eliminatedPlayers.find((p) => p.order === player.order)) {
        // If already selected, remove from selection
        setEliminatedPlayers(
          eliminatedPlayers.filter((p) => p.order !== player.order)
        );
      } else {
        // Otherwise, add to selection
        setEliminatedPlayers([...eliminatedPlayers, player]);
      }
    };

    // Function to confirm the eliminations and update playersLeft
    const confirmEliminations = () => {
      const remainingPlayers = playersRoles.filter(
        (player: any) => !eliminatedPlayers.includes(player)
      );
      setPlayersLeft(remainingPlayers);
      console.log("Players left:", remainingPlayers);
    };

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
              Anyone eliminated this night?
            </Text>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="mb-24">
            <View className="flex-row flex-wrap justify-start p-2 w-full">
              {playersRoles
                // Filter out Werewolves
                .filter((player: any) => player.role !== "Werewolf")
                .map((player: any) => (
                  <View className="w-[33.3%]" key={player.order}>
                    <TouchableOpacity
                      onPress={() => togglePlayerSelection(player)}
                      className={`rounded-lg p-3 m-1 mb-2 items-center ${
                        eliminatedPlayers.find((p) => p.order === player.order)
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

          {/* Continue Button */}
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
  }
);

export default RoleEliminatedBS;
