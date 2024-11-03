import { Text, View } from "@/components/Themed";
import { SafeAreaView } from "react-native";
import MainMenu from "@/components/MainMenu";
import TopPane from "@/components/TopPane";
import { StatusBar } from "expo-status-bar";

export default function MainScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <StatusBar style="light" />
      {/* Top Pane Import */}
      <TopPane iconColor="white" />

      <View className="flex-1 justify-start items-center bg-gray-900 mt-12">
        <Text
          style={{ fontFamily: "Bronzetti_SC_Condensed", fontSize: 34 }}
          className="text-[24px] text-slate-300 font-bold my-1"
        >
          Werewolf:
        </Text>
        <Text
          style={{ fontFamily: "Bronzetti_SC_Condensed", fontSize: 26 }}
          className="text-[24px]  font-bold text-gray-500"
        >
          Save the Village
        </Text>

        <View className="seperator bg-slate-800 my-5 h-[1px] w-[70%]" />
        <MainMenu />
      </View>
    </SafeAreaView>
  );
}
