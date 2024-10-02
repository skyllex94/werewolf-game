import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { SafeAreaView } from "react-native";
import MainMenu from "@/components/MainMenu";
import TopPane from "@/components/TopPane";

export default function MainScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Top Pane Import */}
      <TopPane />

      <View className="flex-1 justify-start items-center mt-12">
        <Text className="text-[24px] font-bold">
          Werewolf: Save the Village
        </Text>

        <View className="seperator bg-slate-200 my-5 h-[1px] w-[80%]" />
        <MainMenu />

        <EditScreenInfo path="app/main.tsx" />
      </View>
    </SafeAreaView>
  );
}