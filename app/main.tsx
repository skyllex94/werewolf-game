import { Dimensions, SafeAreaView, View, Text, Image } from "react-native";
import MainMenu from "@/components/MainMenu";
import TopPane from "@/components/TopPane";
import LottieView from "lottie-react-native";
import { useRef } from "react";

import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function MainScreen() {
  const animation = useRef<LottieView>(null);
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  async function clearAsyncStorage() {
    try {
      await AsyncStorage.removeItem("isFirstOpen");
      console.log("Cleared");
    } catch (err) {
      console.log("RemoveItem from Async Storage Error.", err);
    }
  }

  return (
    <View className="flex-1 relative bg-[#354e6e]">
      <StatusBar style="light" />
      {/* Lottie Animation Background */}
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
        <View className="justify-start items-center bg-transparent">
          <Text
            style={{ fontFamily: "Bronzetti_SC_Condensed", fontSize: 34 }}
            className="text-[24px] text-slate-300 font-bold my-1"
          >
            Werewolf:
          </Text>
          <Text
            style={{ fontFamily: "Bronzetti_SC_Condensed", fontSize: 26 }}
            className="text-[24px] font-bold text-gray-200"
          >
            Save the Village
          </Text>
        </View>

        {/* Top Pane */}
        <TopPane iconColor="white" />

        <TouchableOpacity onPress={clearAsyncStorage}>
          <Text>Clear Storage</Text>
        </TouchableOpacity>

        <View className="flex-1"></View>

        {/* Main Content */}
        <View className="justify-start items-center bg-transparent">
          <MainMenu />
        </View>
      </SafeAreaView>
    </View>
  );
}
