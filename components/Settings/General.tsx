import { View, Text, TouchableOpacity, Linking } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function General() {
  const router = useRouter();

  const sendFeedback = () => {
    const subject = "Feedback for the Werewolf Game App";
    const body =
      "Hello, I would like to contact you regarding Werewolf - Save the Village:\n\n[Your message here]";

    const mailtoUrl = `mailto:zionstudiosapps@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    Linking.openURL(mailtoUrl);
  };

  return (
    <View className="gap-y-2 pt-4">
      <Text className="text-white text-[15px] font-light ml-2">General</Text>

      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: `/shared/privacy_policy` as `${string}:${string}`,
          })
        }
        className="flex-row items-center justify-between bg-slate-800 w-full rounded-lg p-3"
      >
        <Text className="text-white">Privacy Policy</Text>
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
        <Text className="text-white">Terms & Conditions</Text>
        <AntDesign name="right" size={14} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={sendFeedback}
        className="flex-row items-center justify-between bg-slate-800 w-full rounded-lg p-3"
      >
        <Text className="text-white">Contact Us</Text>
        <AntDesign name="right" size={14} color="white" />
      </TouchableOpacity>

      {/* <TouchableOpacity
        // onPress={reportBug}
        className="flex-row items-center justify-between bg-slate-800 w-full rounded-lg p-3"
      >
        <Text className="text-white">Report a Bug</Text>
        <AntDesign name="right" size={14} color="white" />
      </TouchableOpacity> */}
    </View>
  );
}
