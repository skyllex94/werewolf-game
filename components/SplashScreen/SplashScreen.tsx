import React from "react";
import { Text, Animated, Dimensions, View } from "react-native";
import LottieView from "lottie-react-native";

type SplashScreenProps = {
  fadeAnim: Animated.Value;
};

export default function SplashScreen({ fadeAnim }: SplashScreenProps) {
  const { width, height } = Dimensions.get("window");

  return (
    <Animated.View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: width,
        height: height,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0F172A",
        // Fade animation
        opacity: fadeAnim,
        zIndex: 10,
      }}
    >
      <LottieView
        autoPlay
        style={{ width: 50, height: 50 }}
        source={require("../../assets/animations/loading.json")}
      />

      <View className="justify-start items-center bg-transparent">
        <Text
          style={{ fontFamily: "Bronzetti_SC_Condensed", fontSize: 34 }}
          className="text-[24px] text-slate-300 font-bold my-1"
        >
          Werewolf:
        </Text>
        <Text
          style={{ fontFamily: "Bronzetti_SC_Condensed", fontSize: 26 }}
          className="text-[24px] font-bold text-gray-400"
        >
          Save the Village
        </Text>
      </View>
    </Animated.View>
  );
}
