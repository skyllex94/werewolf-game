import useRevenueCat from "@/hooks/RevenueCat";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import Purchases from "react-native-purchases";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

type AllPlansTypes = {
  isModalVisible: boolean;
  toggleModal: () => void;
};

export default function AllPlans({
  isModalVisible,
  toggleModal,
}: AllPlansTypes) {
  const { t } = useTranslation(); // Initialize useTranslation hook for localization
  const { currentOffering } = useRevenueCat();
  const [purchaseSpinner, setPurchaseSpinner] = useState(false);

  async function getSubscription(subscription: string) {
    setPurchaseSpinner(true);

    if (!currentOffering?.[subscription]) {
      setPurchaseSpinner(false);
      return;
    }

    try {
      const purchaserInfo = await Purchases.purchasePackage(
        currentOffering?.[subscription]
      );

      // Check if purchase completed and navigate to main
      if (
        purchaserInfo?.customerInfo?.entitlements?.active
          ?.werewolf_subscriptions
      ) {
        await AsyncStorage.setItem("isFirstOpen", "false");
        toggleModal();
      }
    } catch (err: any) {
      if (!err.userCancelled) {
        setPurchaseSpinner(false);
      }
    }
    setPurchaseSpinner(false);
  }

  async function getSubscriptionPlan(subscription: string) {
    try {
      await getSubscription(subscription);

      // Navigate to Main
      const value = await AsyncStorage.getItem("isFirstOpen");
      if (value === "false") router.replace("/main");
    } catch (err) {
      console.log("Error with Purchase Plan: ", err);
    }
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={toggleModal}
    >
      <Spinner visible={purchaseSpinner} />

      <View className="flex-1 justify-center items-center">
        <View className="bg-gray-900 rounded-2xl p-6 w-[90%]">
          <View className="flex-row items-center justify-between mb-6">
            <View className="p-3"></View>

            <Text className="text-lg font-bold text-center text-white">
              {t("choose_plan_title")} {/* Using translated text for title */}
            </Text>

            <TouchableOpacity
              className="p-2 rounded-full"
              onPress={toggleModal}
            >
              <AntDesign name="close" size={20} color="#94a3b8" />
            </TouchableOpacity>
          </View>

          <View className="items-center gap-y-2">
            <TouchableOpacity
              onPress={() => getSubscriptionPlan("weekly")}
              className="w-full"
            >
              <View className="flex-row justify-between items-center p-3 bg-slate-800 rounded-xl">
                <Text className="font-semibold text-slate-200 text-[15px] px-3">
                  {t("weekly_plan")}
                </Text>
                <View className="items-end">
                  <Text className="text-slate-300 text-xs">
                    {t("trial_offer")}
                  </Text>
                  <Text className="text-slate-300">
                    {currentOffering?.weekly?.product?.priceString}/{t("week")}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => getSubscriptionPlan("monthly")}
              className="w-full"
            >
              <View className="flex-row justify-between items-center p-3 bg-slate-800 rounded-xl">
                <Text className="font-semibold text-slate-200 text-[15px] px-3">
                  {t("monthly_plan")}
                </Text>
                <View className="items-end">
                  <Text className="text-slate-300 text-xs">
                    {t("trial_offer")}
                  </Text>
                  <Text className="text-slate-300">
                    {currentOffering?.monthly?.product?.priceString}/
                    {t("month")}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => getSubscriptionPlan("annual")}
              className="w-full"
            >
              <View className="flex-row justify-between items-center p-3 bg-slate-800 rounded-xl">
                <Text className="font-semibold text-slate-200 text-[15px] px-3">
                  {t("annual_plan")}
                </Text>
                <View className="items-end">
                  <Text className="text-slate-300 text-xs">
                    {t("trial_offer")}
                  </Text>
                  <Text className="text-slate-300">
                    {currentOffering?.annual?.product?.priceString}/{t("year")}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => getSubscriptionPlan("lifetime")}
              className="w-full"
            >
              <View className="flex-row justify-between items-center p-3 bg-slate-800 rounded-xl">
                <Text className="font-semibold text-slate-200 text-[15px] px-3">
                  {t("lifetime_plan")}
                </Text>
                <View className="items-end">
                  <Text className="text-slate-300 text-xs">
                    {t("one_time_purchase")}
                  </Text>
                  <Text className="text-slate-300">
                    {currentOffering?.lifetime?.product?.priceString}{" "}
                    {t("once")}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
