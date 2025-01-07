import React from "react";
import { Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useTranslation } from "react-i18next";
import RulesTopPane from "@/components/Rules/RulesTopPane";

const WinningConditions = () => {
  const { t } = useTranslation();

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <StatusBar style="light" />
      <RulesTopPane iconColor="white" />

      <ScrollView className="p-5 bg-gray-900">
        <Text className="text-xl font-bold text-white mb-4 text-center">
          {t("winningConditions")}
        </Text>

        <Text className="text-sm text-gray-300 mb-3">
          {t("villagersGoalDesc")}
        </Text>

        <Text className="text-sm text-gray-300 mb-3">
          <Text className="font-bold">{t("villagersGoal")}</Text>{" "}
          {t("villagersGoalDesc")}
        </Text>

        <Text className="text-sm text-gray-300 mb-3">
          <Text className="font-bold">{t("werewolvesGoal")}</Text>{" "}
          {t("werewolvesGoalDesc")}
        </Text>

        <Text className="text-sm text-gray-300 mb-3">
          <Text className="font-bold">{t("specialRolesGoal")}</Text>
        </Text>

        <Text className="text-sm text-gray-300 mb-3">
          <Text className="font-bold">{t("tanner")}</Text> {t("tannerDesc")}
        </Text>

        <Text className="text-sm text-gray-300 mb-3">
          <Text className="font-bold">{t("prince")}</Text> {t("princeDesc")}
        </Text>

        <Text className="text-sm text-gray-300 mb-3">
          <Text className="font-bold">{t("hunter")}</Text> {t("hunterDesc")}
        </Text>

        <Text className="text-sm text-gray-300 mb-3">
          <Text className="font-bold">{t("exampleScenarios")}</Text>
        </Text>

        <Text className="text-sm text-gray-300 mb-3">
          <Text className="font-bold">{t("example1")}</Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WinningConditions;
