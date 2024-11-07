import { Text, View } from "@/components/Themed";
import { Dimensions, SafeAreaView } from "react-native";
import MainMenu from "@/components/MainMenu";
import TopPane from "@/components/TopPane";
import { StatusBar } from "expo-status-bar";
import LottieView from "lottie-react-native";
import { useRef } from "react";

export default function MainScreen() {
  const animation = useRef<LottieView>(null);
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  return (
    <View className="flex-1 relative bg-[#354e6e]">
      {/* Lottie Animation Background */}
      <LottieView
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
      />

      {/* Foreground Content */}
      <SafeAreaView className="flex-1 bg-gray-900]">
        <StatusBar style="light" />

        {/* Top Pane */}
        <TopPane iconColor="white" />

        {/* Main Content */}
        <View className="flex-1 justify-start items-center bg-transparent mt-12">
          {/* bg-gray-900  */}
          <Text
            style={{ fontFamily: "Bronzetti_SC_Condensed", fontSize: 34 }}
            className="text-[24px] text-slate-300 font-bold my-1"
          >
            Werewolf:
          </Text>
          <Text
            style={{ fontFamily: "Bronzetti_SC_Condensed", fontSize: 26 }}
            className="text-[24px] font-bold text-gray-500"
          >
            Save the Village
          </Text>
          <View className="seperator bg-slate-800 my-5 h-[1px] w-[70%]" />
          <MainMenu />
        </View>
      </SafeAreaView>
    </View>
  );
}
