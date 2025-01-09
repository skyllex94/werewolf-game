import { View, Text, TouchableOpacity, Linking } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next"; // Import useTranslation

export default function General() {
  const router = useRouter();
  const { t } = useTranslation(); // Hook for translations

  const sendFeedback = () => {
    const subject = t("feedbackSubject");
    const body = `${t("feedbackBody")}\n\n[${t("yourMessageHere")}]`;

    const mailtoUrl = `mailto:zionstudiosapps@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    Linking.openURL(mailtoUrl);
  };

  return (
    <View className="gap-y-2 pt-4">
      <Text className="text-white text-[15px] font-light ml-2">
        {t("general")}
      </Text>

      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: `/shared/privacy_policy` as `${string}:${string}`,
          })
        }
        className="flex-row items-center justify-between bg-slate-800 w-full rounded-lg p-3"
      >
        <Text className="text-white">{t("privacyPolicy")}</Text>
        <AntDesign name="right" size={14} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: `/shared/terms` as `${string}:${string}`,
          })
        }
        className="flex-row items-center justify-between bg-slate-800 w-full rounded-lg p-3"
      >
        <Text className="text-white">{t("termsConditions")}</Text>
        <AntDesign name="right" size={14} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={sendFeedback}
        className="flex-row items-center justify-between bg-slate-800 w-full rounded-lg p-3"
      >
        <Text className="text-white">{t("contactUs")}</Text>
        <AntDesign name="right" size={14} color="white" />
      </TouchableOpacity>

      {/* <TouchableOpacity
        // onPress={reportBug}
        className="flex-row items-center justify-between bg-slate-800 w-full rounded-lg p-3"
      >
        <Text className="text-white">{t("reportBug")}</Text>
        <AntDesign name="right" size={14} color="white" />
      </TouchableOpacity> */}
    </View>
  );
}
