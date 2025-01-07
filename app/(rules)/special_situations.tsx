import React from "react";
import { Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useTranslation } from "react-i18next";
import RulesTopPane from "@/components/Rules/RulesTopPane";

const SpecialConditions = () => {
  const { t } = useTranslation();

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <StatusBar style="light" />
      <RulesTopPane iconColor="white" />

      <ScrollView className="p-5 bg-gray-900">
        <Text className="text-xl font-bold text-white mb-4 text-center">
          {t("special_conditions_title")}
        </Text>

        {/* Prince’s Immunity from Voting Eliminations */}
        <Text className="text-sm text-gray-300 mb-3">
          <Text className="font-bold">{t("prince_immunity_title")}:</Text>
          {t("prince_immunity_description")}
        </Text>
        <Text className="text-sm text-gray-300 mb-3">
          <Text className="italic">{t("example")}</Text>: {t("prince_example")}
        </Text>

        {/* Tanner’s Unique Win Condition */}
        <Text className="text-sm text-gray-300 mb-3">
          <Text className="font-bold">{t("tanner_win_condition_title")}</Text>
          {t("tanner_win_condition_description")}
        </Text>
        <Text className="text-sm text-gray-300 mb-3">
          <Text className="italic">{t("example")}</Text>: {t("tanner_example")}
        </Text>

        {/* Witch’s Dual Potions (Save/Kill) */}
        <Text className="text-sm text-gray-300 mb-3">
          <Text className="font-bold">{t("witch_dual_potions_title")}</Text>
          {t("witch_dual_potions_description")}
        </Text>
        <Text className="text-sm text-gray-300 mb-3">
          <Text className="italic">{t("example")}</Text>: {t("witch_example")}
        </Text>

        {/* Doctor’s Continuous Protection */}
        <Text className="text-sm text-gray-300 mb-3">
          <Text className="font-bold">{t("doctor_protection_title")}</Text>
          {t("doctor_protection_description")}
        </Text>
        <Text className="text-sm text-gray-300 mb-3">
          <Text className="italic">{t("example")}</Text>: {t("doctor_example")}
        </Text>

        {/* Add the rest of the conditions similarly */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SpecialConditions;
