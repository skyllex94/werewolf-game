import { SafeAreaView, View, Image } from "react-native";
import MainMenu from "@/components/MainMenu";
import TopPane from "@/components/TopPane";
import { StatusBar } from "expo-status-bar";
import SplashScreen from "@/components/SplashScreen/SplashScreen";

import { useSplash } from "@/contexts/SplashContext";

export default function MainScreen() {
  // Controlled inside SplashContext
  const { isSplashVisible, fadeAnim } = useSplash();

  return (
    <View className="flex-1 bg-[#354e6e] relative">
      <StatusBar style="light" />

      {/* Background Image */}
      <Image
        className="absolute w-full h-full"
        source={require("../assets/images/backgrounds/new-main2.jpg")}
        resizeMode="cover"
      />

      {/* Splash Screen */}
      {isSplashVisible && <SplashScreen fadeAnim={fadeAnim} />}

      {/* Foreground Content */}
      <SafeAreaView className="flex-1 bg-transparent">
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
