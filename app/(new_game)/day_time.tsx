import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import TopPaneInGame from "@/components/TopPaneInGame";

import CircularProgress from "react-native-circular-progress-indicator";

import { FontAwesome } from "@expo/vector-icons";
import SoundManager from "@/components/NewGame/DaySoundManager";
import DayEliminationBottomSheet from "@/components/NewGame/DayRoleEliminationBS";

export default function DayTimeScreen() {
  const [dayTimeSounds, setDayTimeSounds] = useState<boolean>(true);

  // Bottom Sheet setup
  const eliminatedRoleBSRef = useRef<any>(null);

  const openEliminatedBottomSheet = () => {
    eliminatedRoleBSRef.current?.snapToIndex(0);
  };

  const [time, setTime] = useState(300); // 300 seconds = 5 minutes
  const [isPaused, setIsPaused] = useState(false);

  // Ref to control CircularProgress
  const circularProgressRef = useRef<any>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (!isPaused) {
      timer = setInterval(() => {
        setTime((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }

    // Only clear the timer if it exists
    if (time === 0 && timer) clearInterval(timer);

    // Clean up the timer on unmount if it exists
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [time, isPaused]);

  // Handle play/pause toggle
  const togglePausePlay = () => {
    setIsPaused((prev) => !prev);

    if (circularProgressRef.current) {
      if (isPaused) {
        circularProgressRef.current.play();
      } else {
        circularProgressRef.current.pause();
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 h-[100%]">
      <StatusBar style={"dark"} />
      <TopPaneInGame iconColor="black" />
      {/* Add SoundManager to loop day-bg-sound */}
      <SoundManager dayTimeSounds={dayTimeSounds} />

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
        person in order for that person to be voted out.
      </Text>
      <View className="items-center justify-center mt-24">
        <CircularProgress
          // Ref controlling the animation
          ref={circularProgressRef}
          value={0}
          radius={120}
          maxValue={300}
          initialValue={time}
          activeStrokeWidth={35}
          duration={time * 1000}
          progressValueStyle={{ display: "none" }}
          activeStrokeSecondaryColor="teal"
          inActiveStrokeColor="black"
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

      {/* Bottom Sheet Role Elimination  */}
      <DayEliminationBottomSheet
        ref={eliminatedRoleBSRef}
        setDayTimeSounds={setDayTimeSounds}
      />

      {/* Pause/Play Button */}
      <View className="w-full items-center mt-10 z-[-1]">
        <TouchableOpacity
          className={`flex-row p-4 w-[30%] items-center justify-center rounded-xl ${
            isPaused ? "bg-green-500" : "bg-transparent border border-gray-500"
          }`}
          onPress={togglePausePlay}
        >
          {isPaused ? (
            <FontAwesome name="play" size={18} color="white" />
          ) : (
            <FontAwesome name="pause" size={18} color="black" />
          )}

          <Text
            className={`text-[16px] font-bold ${
              isPaused ? "text-white" : "text-black"
            } mx-2`}
          >
            {isPaused ? "Play" : "Pause"}
          </Text>
        </TouchableOpacity>
      </View>

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
