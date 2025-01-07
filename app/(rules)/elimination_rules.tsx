import React from "react";
import { Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import RulesTopPane from "@/components/Rules/RulesTopPane";
import { useTranslation } from "react-i18next";

const EliminationRules = () => {
  const { t } = useTranslation();

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <StatusBar style="light" />
      <RulesTopPane iconColor="white" />

      <ScrollView className="p-5 bg-gray-900">
        <Text className="text-xl font-bold text-white mb-4 text-center">
          {t("eliminationRulesTitle")}
        </Text>

        <Text className="text-sm text-gray-300 mb-3">
          {t("eliminationRulesIntro")}
        </Text>

        <Text className="text-sm text-gray-300 mb-3">
          <Text className="font-bold">{t("generalEliminationRulesTitle")}</Text>
          {t("generalEliminationRules")}
        </Text>

        <Text className="text-sm text-gray-300 mb-3">
          <Text className="font-bold">{t("eliminationRulesByRoleTitle")}</Text>
        </Text>

        <Text className="text-sm text-gray-300 mb-3">
          <Text className="font-bold">{t("villagerTitle")}</Text>{" "}
          {t("villagerDescription")}
        </Text>

        <Text className="text-sm text-gray-300 mb-3">
          <Text className="font-bold">{t("werewolfTitle")}</Text>{" "}
          {t("werewolfDescription")}
        </Text>

        <Text className="text-sm text-gray-300 mb-3">
          <Text className="font-bold">{t("seerTitle")}</Text>{" "}
          {t("seerDescription")}
        </Text>

        <Text className="text-sm text-gray-300 mb-3">
          <Text className="font-bold">{t("doctorTitle")}</Text>{" "}
          {t("doctorDescription")}
        </Text>

        <Text className="text-sm text-gray-300 mb-3">
          <Text className="font-bold">{t("tannerTitle")}</Text>{" "}
          {t("tannerDescription")}
        </Text>

        <Text className="text-sm text-gray-300 mb-3">
          <Text className="font-bold">{t("cupidTitle")}</Text>{" "}
          {t("cupidDescription")}
        </Text>

        <Text className="text-sm text-gray-300 mb-3">
          <Text className="font-bold">{t("princeTitle")}</Text>{" "}
          {t("princeDescription")}
        </Text>

        <Text className="text-sm text-gray-300 mb-3">
          <Text className="font-bold">{t("bodyguardTitle")}</Text>{" "}
          {t("bodyguardDescription")}
        </Text>

        <Text className="text-sm text-gray-300 mb-3">
          <Text className="font-bold">{t("cursedVillagerTitle")}</Text>{" "}
          {t("cursedVillagerDescription")}
        </Text>

        <Text className="text-sm text-gray-300 mb-3">
          <Text className="font-bold">{t("priestTitle")}</Text>{" "}
          {t("priestDescription")}
        </Text>

        <Text className="text-sm text-gray-300 mb-3">
          <Text className="font-bold">{t("hunterTitle")}</Text>{" "}
          {t("hunterDescription")}
        </Text>

        <Text className="text-sm text-gray-300 mb-3">
          <Text className="font-bold">{t("lycanTitle")}</Text>{" "}
          {t("lycanDescription")}
        </Text>

        <Text className="text-sm text-gray-300 mb-3">
          <Text className="font-bold">{t("witchTitle")}</Text>{" "}
          {t("witchDescription")}
        </Text>

        <Text className="text-sm text-gray-300 mb-3">
          <Text className="font-bold">{t("alphaWerewolfTitle")}</Text>{" "}
          {t("alphaWerewolfDescription")}
        </Text>

        <Text className="text-sm text-gray-300 mb-3 pb-3">
          <Text className="font-bold">{t("wolfCubTitle")}</Text>{" "}
          {t("wolfCubDescription")}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EliminationRules;
