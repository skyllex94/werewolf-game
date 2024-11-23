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
import { StatusBar } from "expo-status-bar";

import { useSplash } from "@/contexts/SplashContext";
import SplashScreen from "@/components/SplashScreen/SplashScreen";

// Define the shape of the slides
interface Slide {
  id: number;
  title: string;
  description: string;
  image: any;
}

export default function OnBoarding() {
  const router = useRouter();

  const [currSlide, setCurrSlide] = useState<number>(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<FlatList<Slide> | null>(null);

  // Splash context controls
  const { isSplashVisible, fadeAnim } = useSplash();

  const viewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: Array<{ index: number | null }> }) => {
      if (viewableItems[0]?.index !== null) {
        setCurrSlide(viewableItems[0].index);
      }
    }
  ).current;

  const { currentOffering } = useRevenueCat();
  const [purchaseSpinner, setPurchaseSpinner] = useState<boolean>(false);

  async function purchaseWeeklySubscription() {
    setPurchaseSpinner(true);

    // Check if there's a weekly offering in RevenueCat
    if (!currentOffering?.weekly) {
      setPurchaseSpinner(false);
      return;
    }

    try {
      const purchaserInfo = await Purchases.purchasePackage(
        currentOffering?.weekly
      );

      // Check to see if purchase was successful
      if (
        purchaserInfo?.customerInfo?.entitlements?.active
          ?.werewolf_subscriptions
      ) {
        await AsyncStorage.setItem("isFirstOpen", "false");

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

        await purchaseWeeklySubscription();

        // Direct to main only if isFirstOpen is false
        const value = await AsyncStorage.getItem("isFirstOpen");
        if (value === "false") router.replace("/main");
      } catch (err) {
        console.log("Error @setItem on isFirstOpen:", err);
      }
    }
  };

  return (
    <View className="flex-1 bg-slate-900 pb-10 relative">
      <Spinner visible={purchaseSpinner} />
      <StatusBar style={"light"} />

      {isSplashVisible && <SplashScreen fadeAnim={fadeAnim} />}

      <FlatList
        data={slides}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        renderItem={({ item }: ListRenderItemInfo<Slide>) => (
          <OnBoardingItem item={item} />
        )}
        keyExtractor={(item) => item.id.toString()}
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
    </View>
  );
}
