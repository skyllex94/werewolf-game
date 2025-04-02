import { View, Text, TouchableOpacity, Share, Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();

  const tellFriends = async () => {
    try {
      const result = await Share.share({
        message: t("shareMessage"),
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
      <Text className="text-white text-[15px] font-light ml-2">
        {t("about")}
      </Text>
      <TouchableOpacity
        onPress={tellFriends}
        className="flex-row items-center justify-between bg-slate-800 w-full rounded-lg p-3"
      >
        <Text className="text-white">{t("tellAFriend")}</Text>
        <AntDesign name="right" size={14} color="white" />
      </TouchableOpacity>
      <View className="flex-row items-center justify-between bg-slate-800 w-full rounded-lg p-3">
        <Text className="text-white">{t("appVersion")}</Text>
        <Text className="text-white">1.0.7</Text>
      </View>
    </View>
  );
}
