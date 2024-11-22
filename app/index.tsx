import { SplashScreen, useLocalSearchParams } from "expo-router";
import OnBoarding from "./onboarding";
import MainScreen from "./main";
import { useEffect } from "react";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Dividing the screens to go to Main or OnBoarding
export default function Index() {
  let isFirstOpen = null;

  const params = useLocalSearchParams();
  const { appFirstOpened } = params;

  // Read the param and translate it to Boolean
  if (appFirstOpened === "true") isFirstOpen = true;
  else isFirstOpen = false;

  // console.log("isFirstOpen3:", isFirstOpen, typeof isFirstOpen);

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return isFirstOpen ? <OnBoarding /> : <MainScreen />;
}
