import {
  FlatList,
  SafeAreaView,
  Animated,
  View,
  ListRenderItemInfo,
} from "react-native";
import React, { useRef, useState } from "react";
import slides from "../constants/OnBoardingSlides";
import OnBoardingItem from "../components/OnBoarding/Item";
import Indicator from "../components/OnBoarding/Indicator";
import ContinueButton from "../components/OnBoarding/Continue";

import Purchases from "react-native-purchases";
import useRevenueCat from "../hooks/RevenueCat";
import Spinner from "react-native-loading-spinner-overlay";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

// Define the shape of the slides
interface Slide {
  id: string;
  title: string;
  description: string;
  image: string;
}

export default function OnBoarding() {
  const router = useRouter();

  const [currSlide, setCurrSlide] = useState<number>(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<FlatList<Slide> | null>(null);

  const viewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: Array<{ index: number | null }> }) => {
      if (viewableItems[0]?.index !== null) {
        setCurrSlide(viewableItems[0].index);
      }
    }
  ).current;

  const { currentOffering } = useRevenueCat();
  const [purchaseSpinner, setPurchaseSpinner] = useState<boolean>(false);

  async function handleWeeklyPurchase() {
    setPurchaseSpinner(true);
    if (!currentOffering?.weekly) {
      setPurchaseSpinner(false);
      return;
    }

    try {
      const purchaserInfo = await Purchases.purchasePackage(
        currentOffering?.weekly
      );

      if (
        purchaserInfo.customerInfo.entitlements.active.esign_pro_subscription
      ) {
        await AsyncStorage.setItem("appFirstOpened", "false");

        // Analytics - actived_subscription event
        // const price = currentOffering?.weekly?.product?.priceString ?? null;
        // analyticsSubscriptionEvent("weekly", "onboarding", price);
      }
    } catch (e: any) {
      if (!e.userCancelled) setPurchaseSpinner(false);
    }
    setPurchaseSpinner(false);
  }

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const slideForward = async () => {
    if (currSlide < slides.length - 1)
      slidesRef.current?.scrollToIndex({ index: currSlide + 1 });
    // If no more slides, complete the OnBoarding and,
    // store the value in async storage - navigate to the App
    else {
      try {
        // Analytics - paywall_shown event trigger
        // await analyticsPaywallShownEvent("onboarding");

        await handleWeeklyPurchase();

        const value = await AsyncStorage.getItem("appFirstOpened");
        if (value !== null) router.replace("/");
      } catch (err) {
        console.log("Error @setItem on appFirstOpened:", err);
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <Spinner visible={purchaseSpinner} />

      <FlatList
        data={slides}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        renderItem={({ item }: ListRenderItemInfo<Slide>) => (
          <OnBoardingItem item={item} />
        )}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        scrollEventThrottle={32}
        ref={slidesRef}
      />

      <View className="items-center">
        <Indicator data={slides} scrollX={scrollX} />

        <ContinueButton
          slideForward={slideForward}
          percentage={(currSlide + 1) * (100 / slides.length)}
          currSlide={currSlide}
          currentOffering={currentOffering}
        />
      </View>
    </SafeAreaView>
  );
}
