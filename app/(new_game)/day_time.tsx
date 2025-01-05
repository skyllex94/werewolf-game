import React, { useContext, useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useTranslation } from "react-i18next";
import TopPaneInGame from "@/components/TopPaneInGame";

import CircularProgress from "react-native-circular-progress-indicator";
import { FontAwesome } from "@expo/vector-icons";

import DayEliminationBottomSheet from "@/components/NewGame/DayRoleEliminationBS";
import { BlurView } from "expo-blur";
import SoundContext from "@/contexts/SoundContext";

export default function DayTimeScreen() {
  const { setDaySoundsEnabled } = useContext(SoundContext)!;
  const { t } = useTranslation();

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
    setDaySoundsEnabled(true);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (!isPaused) {
      timer = setInterval(() => {
        setTime((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }

    if (time === 0 && timer) clearInterval(timer);

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [time, isPaused]);

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

      <Image
        className="absolute top-0 left-0 w-full h-[111%] z-[-1]"
        resizeMode="cover"
        source={require("../../assets/images/backgrounds/day_upscaled.jpg")}
      />

      {/* Heading Text */}
      <Text className="text-center font-bold text-[20px] py-4">
        {t("dayTime.title")}
      </Text>
      <Text className="text-start font-light text-[15px] px-10 mb-1">
        {t("dayTime.description1")}
      </Text>
      <Text className="text-start font-light text-[15px] px-10">
        {t("dayTime.description2")}
      </Text>

      <View className="timer items-center">
        <BlurView
          tint="systemChromeMaterial"
          className="items-center justify-center mt-12"
          style={{
            width: 260,
            height: 260,
            borderRadius: 130,
            overflow: "hidden",
          }}
        >
          <CircularProgress
            ref={circularProgressRef}
            value={0}
            radius={120}
            maxValue={300}
            initialValue={time}
            activeStrokeWidth={35}
            duration={time * 1000}
            progressValueStyle={{ display: "none" }}
            activeStrokeSecondaryColor="teal"
            inActiveStrokeColor="white"
            dashedStrokeConfig={{
              count: 150,
              width: 2,
            }}
          />

          <Text
            className="text-white absolute"
            style={{ fontSize: 40, fontWeight: "bold", top: "30%" }}
          >
            {`${Math.floor(time / 60)}:${String(time % 60).padStart(2, "0")}`}
          </Text>

          <View
            style={{ position: "absolute", bottom: 70, alignItems: "center" }}
          >
            <TouchableOpacity
              className={`flex-row p-3 w-[60%] items-center justify-center rounded-xl ${
                isPaused ? "bg-green-500" : "bg-transparent border border-white"
              }`}
              onPress={togglePausePlay}
            >
              {isPaused ? (
                <FontAwesome name="play" size={18} color="white" />
              ) : (
                <FontAwesome name="pause" size={18} color="white" />
              )}
            </TouchableOpacity>
          </View>
        </BlurView>
      </View>

      <DayEliminationBottomSheet
        ref={eliminatedRoleBSRef}
        setDaySoundsEnabled={setDaySoundsEnabled}
      />

      <View className="continue-button w-[100%] items-center absolute bottom-10 z-[-1]">
        <TouchableOpacity
          className="bg-slate-400 items-center justify-center p-4 w-[90%] rounded-xl z-10"
          onPress={openEliminatedBottomSheet}
        >
          <Text className="text-[16px] font-bold">{t("continueButton")}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
