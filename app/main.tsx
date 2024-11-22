import { Dimensions, SafeAreaView, View, Text, Image } from "react-native";
import MainMenu from "@/components/MainMenu";
import TopPane from "@/components/TopPane";
import LottieView from "lottie-react-native";
import { useRef } from "react";

import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function MainScreen() {
  return (
    <View className="flex-1 relative bg-[#354e6e]">
      <StatusBar style="light" />
      {/* Lottie Animation Background */}

      {/* const animation = useRef<LottieView>(null);
          const width = Dimensions.get("window").width;
          const height = Dimensions.get("window").height; */}

      {/* <LottieView
        autoPlay
        ref={animation}
        loop={true}
        style={{
          position: "absolute",
          top: 200,
          left: 0,
          width: width,
          height: height,
          zIndex: -1,
        }}
        source={require("../assets/animations/paperplane.json")}
      /> */}

      <Image
        className="absolute w-full h-full"
        source={require("../assets/images/backgrounds/new-main2.jpg")}
      />

      {/* Foreground Content */}
      <SafeAreaView className="flex-1 bg-gray-900]">
        {/* Top Pane */}
        <TopPane iconColor="white" />

        <View className="flex-1" />

        {/* Main Content */}
        <View className="justify-start items-center">
          <MainMenu />
        </View>
      </SafeAreaView>
    </View>
  );
}
