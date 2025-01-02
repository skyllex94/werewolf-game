import { View, Text, TouchableOpacity, Share, Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function About() {
  // Make sure you insert URL to to game after finished
  const tellFriends = async () => {
    try {
      const result = await Share.share({
        message:
          "Hey, if you want check this social game I've been playing called Werewolf: Save the Village on the App Store.",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  return (
    <View className="gap-y-2 pt-4">
      <Text className="text-white text-[15px] font-light ml-2">About</Text>

      <TouchableOpacity
        onPress={tellFriends}
        className="flex-row items-center justify-between bg-slate-800 w-full rounded-lg p-3"
      >
        <Text className="text-white">Tell a Friend</Text>
        <AntDesign name="right" size={14} color="white" />
      </TouchableOpacity>

      <View className="flex-row items-center justify-between bg-slate-800 w-full rounded-lg p-3">
        <Text className="text-white">App Version</Text>
        <Text className="text-white">1.0.4</Text>
      </View>
    </View>
  );
}
