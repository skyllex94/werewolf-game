import { Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import RulesTopPane from "@/components/Rules/RulesTopPane";
import { useTranslation } from "react-i18next";

const BasicOverview = () => {
  const { t } = useTranslation();

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <StatusBar style="light" />
      <RulesTopPane iconColor="white" />

      <ScrollView className="p-5 bg-gray-900">
        <Text className="text-xl font-bold text-white mb-4 text-center">
          {t("basicOverview.title")}
        </Text>

        <Text className="text-sm text-gray-300 mb-3">
          {t("basicOverview.description1")}
        </Text>

        <Text className="text-sm text-gray-300 mb-3">
          {t("basicOverview.description2")}
        </Text>

        <Text className="text-sm text-gray-300 mb-3">
          <Text className="font-bold">{t("basicOverview.duringNight")}</Text>
        </Text>

        <Text className="text-sm text-gray-300 mb-3">
          {t("basicOverview.nightDescription1")}
        </Text>
        <Text className="text-sm text-gray-300 mb-3">
          {t("basicOverview.nightDescription2")}
        </Text>

        <Text className="text-sm text-gray-300 mb-3">
          {t("basicOverview.nightDescription3")}
        </Text>

        <Text className="text-sm text-gray-300 mb-3">
          {t("basicOverview.duringDay")}
        </Text>

        <Text className="text-sm text-gray-300 mb-3">
          {t("basicOverview.dayDescription1")}
        </Text>
        <Text className="text-sm text-gray-300 mb-3">
          {t("basicOverview.dayDescription2")}
        </Text>
        <Text className="text-sm text-gray-300 mb-3">
          {t("basicOverview.dayDescription3")}
        </Text>

        <Text className="text-sm text-gray-300 mb-3">
          <Text className="font-bold">{t("basicOverview.goal")}</Text>
        </Text>

        <Text className="text-sm text-gray-300 mb-3">
          {t("basicOverview.tannerRole")}
        </Text>

        <Text className="text-sm text-gray-300 mb-3">
          <Text className="font-bold">
            {t("basicOverview.playersStrategy")}
          </Text>
        </Text>

        <Text className="text-sm text-gray-300 mb-3">
          {t("basicOverview.narratorRole")}
        </Text>

        <Text className="text-sm text-gray-300 mb-3 pb-3">
          {t("basicOverview.eliminationRule")}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BasicOverview;
