import React from "react";
import { Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import RulesTopPane from "@/components/Rules/RulesTopPane";
import { useTranslation } from "react-i18next";

const GamePhases = () => {
  const { t } = useTranslation();

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <StatusBar style="light" />
      <RulesTopPane iconColor="white" />

      <ScrollView className="p-5 bg-gray-900">
        <Text className="text-xl font-bold text-white mb-4 text-center">
          {t("gamePhasesTitle")}
        </Text>

        <Text className="text-sm text-gray-300 mb-3">
          {t("gamePhasesDescription")}
          <Text className="font-bold"> {t("nightPhase")}</Text> {t("and")}{" "}
          <Text className="font-bold"> {t("dayPhase")}</Text>.{" "}
          {t("phasesDescription")}
        </Text>

        <Text className="text-sm text-gray-300 mb-3">
          {t("nightPhaseDescription")}
        </Text>

        <Text className="text-sm text-gray-300 mb-3 pb-3">
          {t("dayPhaseDescription")}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GamePhases;
