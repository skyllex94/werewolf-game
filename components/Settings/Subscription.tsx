import { View, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import useRevenueCat from "../../hooks/RevenueCat";
import Purchases from "react-native-purchases";
import { showMessage } from "react-native-flash-message";
import { useRouter } from "expo-router";
import * as StoreReview from "expo-store-review";

export default function Subscription() {
  const { isProMember } = useRevenueCat();
  const router = useRouter();

  async function restorePurchase() {
    showMessage({
      message: "Looking to restore a purchase",
      duration: 2000,
      backgroundColor: "#3EB489",
    });
    const purchaserInfo = await Purchases.restorePurchases();

    if (purchaserInfo?.activeSubscriptions.length > 0) {
      Alert.alert("Success", "Your purchase has been restored");
    } else Alert.alert("Failure", "There are no purchases to restore");
  }

  async function rateApp() {
    try {
      if (await StoreReview.hasAction()) {
        StoreReview.requestReview();
      }
    } catch (err) {
      showMessage({
        message: "Error occurred",
        description:
          "There was an error which occurred white loading the review modal.",
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
                Get All Roles
              </Text>
              <Text className="text-slate-800">
                Unlock 10+ New Roles & More
              </Text>
            </View>

            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/shared/paywall" as any,
                })
              }
              className="bg-white rounded-full mr-4"
            >
              <Text className="p-3 font-semibold">Werewolf Pro</Text>
            </TouchableOpacity>
          </LinearGradient>

          <TouchableOpacity
            onPress={restorePurchase}
            className="flex-row items-center justify-between bg-gray-800 w-full rounded-lg p-3"
          >
            <Text className="text-white">Restore Purchase</Text>
            <AntDesign name="right" size={14} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={rateApp}
            className="flex-row items-center justify-between bg-gray-800 w-full rounded-lg p-3"
          >
            <Text className="text-white">Rate the App</Text>
            <AntDesign name="right" size={14} color="white" />
          </TouchableOpacity>
        </React.Fragment>
      )}
    </View>
  );
}
