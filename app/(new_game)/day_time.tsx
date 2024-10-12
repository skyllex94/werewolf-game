import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import TopPaneInGame from "@/components/TopPaneInGame";

import CircularProgress from "react-native-circular-progress-indicator";
import RoleEliminatedBS from "@/components/NewGame/RoleEliminatedBS";

export default function DayTimeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { players_roles } = params;

  // Bottom Sheet setup
  const eliminatedRoleBSRef = useRef<any>(null);

  const openEliminatedBottomSheet = () => {
    eliminatedRoleBSRef.current?.snapToIndex(0);
  };

  const [time, setTime] = useState(300); // 300 seconds = 5 minutes

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    if (time === 0) clearInterval(timer);

    return () => clearInterval(timer); // Clean up the timer on unmount
  }, [time]);

  const handleContinuePress = () => {
    if (time > 0) {
      Alert.alert(
        "Timer is not finished!",
        "Do you want to continue to continue regardless?",
        [
          {
            text: "Yes",
            onPress: () => {
              // Action to continue to the next night
              Alert.alert("Continuing to the next phase...");
              // Navigate to the next screen or perform your desired action here
            },
          },
          {
            text: "No",
            onPress: () => console.log("Cancelled"),
          },
        ]
      );
    } else {
      // Action to continue to the next night
      Alert.alert("Continuing to the next phase...");
      // Navigate to the next screen or perform your desired action here
    }
  };

  // Stop all night sounds
  function stopNightSounds() {}

  return (
    <SafeAreaView className="flex-1 h-[100%]">
      <StatusBar style={"dark"} />
      <TopPaneInGame iconColor="black" />

      {/* Heading Text */}
      <Text className="text-center font-bold text-[20px] py-4">
        Day Time is Here
      </Text>
      <Text className="text-start font-light text-[15px] px-10 mb-1">
        The Village has 5 minutes to decide whether they can agree on a player
        to vote out.
      </Text>
      <Text className="text-start font-light text-[15px] px-10">
        There needs to be at least half of the Village to agree on a single
        person in order to be agreed upon to be voted out.
      </Text>

      <View className="items-center justify-center mt-24 shadow">
        <CircularProgress
          value={0}
          radius={120}
          maxValue={300}
          initialValue={time}
          activeStrokeWidth={35}
          duration={time * 1000}
          onAnimationComplete={() => alert("Time out!")}
          progressValueStyle={{ display: "none" }} // Hide progress value text
          activeStrokeSecondaryColor="teal" // Color for the active stroke
          inActiveStrokeColor="black" // Color for the inactive stroke
          dashedStrokeConfig={{
            count: 150,
            width: 2,
          }}
        />
        <Text
          className="absolute"
          style={{ marginTop: 20, fontSize: 40, fontWeight: "bold" }}
        >
          {`${Math.floor(time / 60)}:${String(time % 60).padStart(2, "0")}`}
        </Text>
      </View>

      <RoleEliminatedBS
        ref={eliminatedRoleBSRef}
        stopNightSounds={stopNightSounds}
      />

      {/* Continue Button */}
      <View className="continue-button w-[100%] items-center absolute bottom-10 z-[-1]">
        <TouchableOpacity
          className="bg-slate-300 items-center justify-center p-4 w-[90%] rounded-xl z-10"
          onPress={openEliminatedBottomSheet}
        >
          <Text className="text-[16px] font-bold">Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
