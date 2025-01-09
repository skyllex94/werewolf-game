import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  AntDesign,
  FontAwesome5,
  FontAwesome6,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

// Purchase API imports
import useRevenueCat from "../../hooks/RevenueCat";
import Purchases from "react-native-purchases";

// UI Imports
import Spinner from "react-native-loading-spinner-overlay/lib";
import { ScrollView } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";

export default function Paywall() {
  const router = useRouter();
  const { currentOffering } = useRevenueCat();

  const [loadedPaywall, setLoadedPaywall] = useState(false);
  const [purchaseSpinner, setPurchaseSpinner] = useState(false);

  const [showOtherPlans, setShowOtherPlans] = useState(false);

  const { t } = useTranslation();

  // Fetch all pricing data before displaying paywall
  useEffect(() => {
    if (
      currentOffering?.weekly?.product.priceString &&
      currentOffering?.monthly?.product.priceString
    )
      setLoadedPaywall(true);
  }, [currentOffering]);

  useEffect(() => {
    async function paywallShownEvent() {
      try {
        // await analyticsPaywallShownEvent(trafficSource ?? null);
        // console.log("analyticsPaywallShownEvent Triggered");
      } catch (err) {
        console.log("Error with initial Paywall Analytics event: ", err);
      }
    }

    paywallShownEvent();
  }, []);

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

      // Check if purchase completed and navigate back
      if (
        purchaserInfo.customerInfo.entitlements.active.werewolf_subscriptions
      ) {
        router.back();
      }
    } catch (err: any) {
      if (!err.userCancelled) {
        setPurchaseSpinner(false);
      }
    }
    setPurchaseSpinner(false);
  }

  async function restorePurchase() {
    setPurchaseSpinner(true);
    const purchaserInfo = await Purchases.restorePurchases();

    if (purchaserInfo?.activeSubscriptions.length > 0) {
      Alert.alert("Success", "Your purchase has been restored");

      router.back();
    } else Alert.alert("Failure", "There are no purchases to restore");
    setPurchaseSpinner(false);
  }

  return (
    <React.Fragment>
      {loadedPaywall ? (
        <View className="flex-1 bg-slate-900">
          <Spinner visible={purchaseSpinner} />

          <View className="paywall-image items-center">
            <TouchableOpacity
              onPress={() => router.back()}
              className={`z-10 absolute top-6 right-6 rounded-full p-3`}
            >
              <AntDesign name="close" size={20} color="white" />
            </TouchableOpacity>

            <Image
              className="h-60 w-full rounded-bl-full rounded-b-[180px]"
              resizeMode="cover"
              source={require("../../assets/images/paywall/paywall-image.jpg")}
            />

            <View className="w-[80px] absolute shadow top-48 bg-white rounded-full p-4">
              <MaterialIcons name="workspace-premium" size={48} color="black" />
            </View>

            <View className="mb-10" />

            <Text className="text-white font-light text-[20px] mb-3">
              {t("fullAccessToFeatures")}
            </Text>
          </View>

          <ScrollView className="mb-6" showsVerticalScrollIndicator={false}>
            <View className="premium-features mt-6">
              <View className="flex-row items-center gap-x-5 m-3 ">
                <FontAwesome5 name="users" size={32} color="white" />

                <View className="flex-1 gap-y-1">
                  <Text className="text-white text-[16px] font-semibold">
                    {t("differentRoles")}
                  </Text>
                  <Text className="text-white text-[14px] font-light">
                    {t("differentRolesDescription")}
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center gap-x-5 m-3">
                <MaterialCommunityIcons
                  name="account-voice"
                  size={40}
                  color="white"
                />
                <View className="flex-1 gap-y-1">
                  <Text className="text-white text-[16px] font-semibold">
                    {t("narratorAssistance")}
                  </Text>
                  <Text className="text-white text-[14px] font-light">
                    {t("narratorAssistanceDescription")}
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center gap-x-5 m-3">
                <FontAwesome6 name="ranking-star" size={32} color="white" />
                <View className="flex-1 gap-y-1">
                  <Text className="text-white text-[16px] font-semibold">
                    {t("moreGameOutcomes")}
                  </Text>
                  <Text className="text-white text-[14px] font-light">
                    {t("moreGameOutcomesDescription")}
                  </Text>
                </View>
              </View>
            </View>

            {showOtherPlans ? (
              <View className="items-center gap-y-2">
                <TouchableOpacity
                  onPress={() => getSubscription("weekly")}
                  className="w-[90%]"
                >
                  <LinearGradient
                    className="items-center p-3 rounded-full"
                    colors={["#3EB489", "#90EE90"]}
                    start={[0, 0]}
                    end={[1, 1]}
                  >
                    <Text className="font-semibold text-[15px]">
                      {t("weeklyPlan")}
                    </Text>
                    <Text>
                      {t("freeTrial")}, {t("andThen")}{" "}
                      {currentOffering?.weekly?.product?.priceString}/
                      {t("week")}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => getSubscription("monthly")}
                  className="w-[90%]"
                >
                  <LinearGradient
                    className="items-center p-3 rounded-full"
                    colors={["#3EB489", "#90EE90"]}
                    start={[0, 0]}
                    end={[1, 1]}
                  >
                    <Text className="font-semibold text-[15px]">
                      {t("monthlyPlan")}
                    </Text>
                    <Text>
                      {t("freeTrial")}, {t("andThen")}{" "}
                      {currentOffering?.monthly?.product?.priceString}/
                      {t("month")}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => getSubscription("annual")}
                  className="w-[90%]"
                >
                  <LinearGradient
                    className="items-center p-3 rounded-full"
                    colors={["#3EB489", "#90EE90"]}
                    start={[0, 0]}
                    end={[1, 1]}
                  >
                    <Text className="font-semibold text-[15px]">
                      {t("yearlyPlan")}
                    </Text>
                    <Text>
                      {t("freeTrial")}, {t("andThen")}{" "}
                      {currentOffering?.annual?.product?.priceString}/
                      {t("year")}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => getSubscription("lifetime")}
                  className="w-[90%]"
                >
                  <LinearGradient
                    className="items-center p-3 rounded-full"
                    colors={["#3EB489", "#90EE90"]}
                    start={[0, 0]}
                    end={[1, 1]}
                  >
                    <Text className="font-semibold text-[15px]">
                      {t("lifetimePlan")}
                    </Text>
                    <Text>
                      {t("lifetimePlanDescription")}{" "}
                      {currentOffering?.lifetime?.product?.priceString}{" "}
                      {t("lifetimePayment")}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            ) : (
              <View className="paywall-buttons mt-6">
                <View className="items-center mb-2">
                  <Text className="text-white font-light">
                    {t("callToTrial")}
                  </Text>
                  <Text className="text-white font-semibold">
                    {t("weeklyPrice", {
                      price: currentOffering?.weekly?.product?.priceString,
                    })}
                  </Text>
                </View>

                <View className="items-center gap-y-2">
                  <TouchableOpacity
                    onPress={() => getSubscription("weekly")}
                    className="w-[90%]"
                  >
                    <LinearGradient
                      className="items-center p-3 rounded-full"
                      colors={["#3EB489", "#90EE90"]}
                      start={[0, 0]}
                      end={[1, 1]}
                    >
                      <Text className="text-[20px] font-light">
                        {t("continue")}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="items-center w-[90%] p-3 border-2 border-slate-800 rounded-full"
                    onPress={() => setShowOtherPlans(true)}
                  >
                    <Text className="text-white text-[20px] font-light">
                      {t("viewAllPlans")}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            <View className="items-center">
              <View className="mt-3 mb-8 w-[90%]">
                <View className="flex-row items-center justify-center">
                  <TouchableOpacity
                    onPress={() =>
                      router.push({
                        pathname: "/shared/privacy_policy",
                        params: { presentation: "modal" },
                      })
                    }
                  >
                    <Text className="text-white text-[13px]">
                      {t("privacyPolicy")}
                    </Text>
                  </TouchableOpacity>
                  <Text className="text-white mx-2">|</Text>

                  <TouchableOpacity onPress={restorePurchase}>
                    <Text className="text-white text-[13px]">
                      {t("restorePurchase")}
                    </Text>
                  </TouchableOpacity>
                  <Text className="text-white mx-2">|</Text>

                  <TouchableOpacity
                    onPress={() =>
                      router.push({
                        pathname: "/shared/terms",
                        params: { presentation: "modal" },
                      })
                    }
                  >
                    <Text className="text-white text-[13px]">
                      {t("termsOfUse")}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      ) : (
        <View className="flex-1 bg-slate-900">
          <ActivityIndicator
            className="pt-20 z-10"
            size="large"
            color={"white"}
          />
        </View>
      )}
    </React.Fragment>
  );
}
