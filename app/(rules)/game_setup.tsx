import React from "react";
import { Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import RulesTopPane from "@/components/Rules/RulesTopPane";
import { useTranslation } from "react-i18next";

const GameSetup = () => {
  const { t } = useTranslation();

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <StatusBar style="light" />
      <RulesTopPane iconColor="white" />

      <ScrollView className="p-5 bg-gray-900">
        <Text className="text-xl font-bold text-white mb-4 text-center">
          {t("gameSetupTitle")}
        </Text>

        <Text className="text-sm text-gray-300 mb-3">
          {t("gameSetupDescription")}
        </Text>

        <Text className="text-sm text-gray-300 mb-3">
          <Text className="font-bold">{t("step1Title")}</Text> -{" "}
          {t("step1Description")}
        </Text>

        <Text className="text-sm text-gray-300 mb-3">
          <Text className="font-bold">{t("step2Title")}</Text> -{" "}
          {t("step2Description")}
        </Text>

        <Text className="text-sm text-gray-300 mb-3">
          <Text className="font-bold">{t("step3Title")}</Text> -{" "}
          {t("step3Description")}
        </Text>

        <Text className="text-sm text-gray-300 mb-3">
          {t("gameEndDescription")}
        </Text>

        <Text className="text-sm text-gray-300 mb-3 pb-3">
          {t("finalNotes")}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GameSetup;
