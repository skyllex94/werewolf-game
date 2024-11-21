import { SplashScreen, useLocalSearchParams, type Href } from "expo-router";
import OnBoarding from "./onboarding";
import MainScreen from "./main";
import { useEffect } from "react";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function Index() {
  const params = useLocalSearchParams();

  const { appFirstOpen } = params;
  console.log("appFirstOpen:", Boolean(appFirstOpen));

  const firstOpen = Boolean(appFirstOpen);

  const href = (firstOpen ? "onboarding" : "main") as Href;

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return firstOpen ? <OnBoarding /> : <MainScreen />;
}
