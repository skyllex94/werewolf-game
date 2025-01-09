import { View, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import useRevenueCat from "../../hooks/RevenueCat";
import Purchases from "react-native-purchases";
import { showMessage } from "react-native-flash-message";
import { useRouter } from "expo-router";
import * as StoreReview from "expo-store-review";
import { useTranslation } from "react-i18next"; // Import useTranslation

export default function Subscription() {
  const { isProMember } = useRevenueCat();
  const router = useRouter();
  const { t } = useTranslation(); // Hook for translations

  async function restorePurchase() {
    showMessage({
      message: t("restorePurchaseMessage"),
      duration: 2000,
      backgroundColor: "#3EB489",
    });
    const purchaserInfo = await Purchases.restorePurchases();

    if (purchaserInfo?.activeSubscriptions.length > 0) {
      Alert.alert(t("success"), t("purchaseRestored"));
    } else {
      Alert.alert(t("failure"), t("noPurchasesToRestore"));
    }
  }

  async function rateApp() {
    showMessage({
      message: t("rateAppMessage"),
      duration: 2000,
      backgroundColor: "#3EB489",
    });

    const isAvailableStoreReview = await StoreReview.isAvailableAsync();

    if (isAvailableStoreReview) {
      StoreReview.requestReview();
    } else {
      showMessage({
        message: t("errorOccurred"),
        description: t("reviewError"),
        duration: 4000,
        backgroundColor: "#3EB489",
      });
    }
  }

  return (
    <View className="items-center gap-y-2 mt-1">
      {!isProMember && (
        <React.Fragment>
          <LinearGradient
            className="flex-row bg-white items-center justify-between py-4 w-full mb-1 rounded-2xl"
            colors={["#3EB489", "#90EE90"]}
            start={[0, 0]}
            end={[1, 1]}
          >
            <View className="flex-1 items-start ml-5 gap-y-1">
              <Text className="text-lg font-semibold text-[20px] text-slate-900">
                {t("getAllRoles")}
              </Text>
              <Text className="text-slate-800">{t("unlockNewRoles")}</Text>
            </View>

            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/shared/paywall" as any,
                })
              }
              className="bg-white rounded-full mr-4"
            >
              <Text className="p-3 font-semibold">{t("werewolfPro")}</Text>
            </TouchableOpacity>
          </LinearGradient>

          <TouchableOpacity
            onPress={restorePurchase}
            className="flex-row items-center justify-between bg-gray-800 w-full rounded-lg p-3"
          >
            <Text className="text-white">{t("restorePurchase")}</Text>
            <AntDesign name="right" size={14} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={rateApp}
            className="flex-row items-center justify-between bg-gray-800 w-full rounded-lg p-3"
          >
            <Text className="text-white">{t("rateApp")}</Text>
            <AntDesign name="right" size={14} color="white" />
          </TouchableOpacity>
        </React.Fragment>
      )}
    </View>
  );
}
