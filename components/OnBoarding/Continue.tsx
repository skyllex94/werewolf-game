import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import { View, Animated, TouchableOpacity, Text } from "react-native";
import * as StoreReview from "expo-store-review";
import { showMessage } from "react-native-flash-message";

// Define the types for the props
type ContinueButtonProps = {
  percentage: number;
  slideForward: () => void;
  currSlide: number;
  currentOffering: any;
};

// Component definition
export default function ContinueButton({
  percentage,
  slideForward,
  currSlide,
  currentOffering,
}: ContinueButtonProps) {
  const size = 128;
  const strokeWidth = 2;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const progressAnimation = useRef(new Animated.Value(0)).current;
  const progressRef = useRef<any>(null);

  const animation = (toValue: number) => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animation(percentage);
  }, [percentage]);

  useEffect(() => {
    const listener = progressAnimation.addListener((value) => {
      const strokeDashoffset =
        circumference - (circumference * value.value) / 100;

      if (progressRef?.current) {
        progressRef.current.setNativeProps({
          strokeDashoffset,
        });
      }
    });

    return () => {
      progressAnimation.removeListener(listener);
    };
  }, [progressAnimation, circumference]);

  async function requestReview() {
    const isAvailable = await StoreReview.isAvailableAsync();

    // A second delay for reading the text
    if (isAvailable) {
      setTimeout(() => {
        StoreReview.requestReview();
      }, 1000);
    } else {
      console.log("Error occured while loading App Store Review");
    }
  }

  // Request Review - Help Us Grow page
  useEffect(() => {
    if (currSlide === 3) requestReview();
  }, [currSlide]);

  return (
    <View className="items-center justify-center">
      {currSlide === 4 && (
        <Text className="font-light text-xs bottom-12 absolute py-2 text-white">
          Try 3 days free, then {currentOffering?.weekly?.product.priceString}
          /week
        </Text>
      )}

      <TouchableOpacity
        onPress={slideForward}
        activeOpacity={0.6}
        className="rounded-full w-64"
      >
        <LinearGradient
          className="items-center p-4 rounded-full"
          colors={["#3EB489", "#90EE90"]}
          start={[0, 0]}
          end={[1, 1]}
        >
          <Text className="text-center font-light text-[16px]">Next</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}
