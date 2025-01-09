import React from "react";
import { Text, View, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import RulesTopPane from "../Rules/RulesTopPane";
import { useTranslation } from "react-i18next";

type RoleTemplateProps = {
  name: string;
  description: string;
  roleType: "good" | "bad" | "independent";
  interactions: string[];
  imagePath: any;
};

const RoleTemplate: React.FC<RoleTemplateProps> = ({
  name,
  description,
  roleType,
  interactions,
  imagePath,
}) => {
  const { t } = useTranslation();

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <StatusBar style="light" />
      <RulesTopPane iconColor="white" />

      <ScrollView className="p-5 bg-gray-900">
        {/* Role Name as Title */}
        <Text className="text-2xl font-bold text-center text-white mb-5">
          {name}
        </Text>

        {/* Role Image */}
        <View className="flex items-center mb-4 p-2">
          <View className="p-1 border border-slate-600 rounded-2xl">
            <Image
              className="w-[180px] h-[180px] border rounded-xl"
              source={imagePath}
            />
          </View>
        </View>

        {/* Role Description */}
        <View className="mb-4">
          <Text className="text-lg font-semibold text-gray-300 mb-2">
            {t("rolesScreen.description")}
          </Text>
          <Text className="text-sm text-gray-400">{description}</Text>
        </View>

        {/* Role Type */}
        <View className="mb-4">
          <Text className="text-lg font-semibold text-gray-300 mb-2">
            {t("rolesScreen.roleType")}
          </Text>
          <Text
            className={`text-sm font-bold ${
              roleType === "good"
                ? "text-green-400"
                : roleType === "bad"
                ? "text-red-400"
                : "text-yellow-400"
            }`}
          >
            {t(`rolesScreen.roleTypes.${roleType}`)}
          </Text>
        </View>

        {/* Interactions with Other Roles */}
        <View className="mb-10">
          <Text className="text-lg font-semibold text-gray-300 mb-2">
            {t("rolesScreen.interactions")}
          </Text>
          {interactions.map((interaction, index) => (
            <View key={index} className="flex-row items-start mb-2 mr-4">
              <Text className="text-gray-300">• </Text>
              <Text className="text-sm text-gray-400">{interaction}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RoleTemplate;
