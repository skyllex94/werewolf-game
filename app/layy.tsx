import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { ThemeProvider, DefaultTheme } from "@react-navigation/native";

import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import FlashMessage from "react-native-flash-message";

// Global sound context
import { SoundProvider } from "./../contexts/SoundContext";
import NewGameContext from "@/contexts/NewGameContext";

// Bottom sheet imports
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import SplashAnimation from "../components/SplashScreen/SplashScreen";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Bronzetti_SC_Condensed: require("../assets/fonts/Bronzetti-SC-Condensed-Bold.otf"),
    Bronzetti_Condensed: require("../assets/fonts/Bronzetti-Condensed-Bold.otf"),
  });

  const [appFirstOpened, setAppFirstOpened] = useState<boolean | null>(null);
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  // Check if the app is being opened for the first time
  useEffect(() => {
    const checkFirstTimeOpen = async () => {
      try {
        const storageValue = await AsyncStorage.getItem("isFirstOpen");
        const isFirstOpen = storageValue !== "false";

        if (isFirstOpen) {
          await AsyncStorage.setItem("isFirstOpen", "true");
        }

        setAppFirstOpened(isFirstOpen);
      } catch (err) {
        console.error("Error checking first open:", err);
        setAppFirstOpened(false);
      }
    };

    checkFirstTimeOpen();
  }, []);

  // Handle font loading errors
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  // Control splash screen visibility
  // useEffect(() => {
  //   if (loaded && appFirstOpened !== null) {
  //     setTimeout(() => {
  //       setIsSplashVisible(false);
  //       SplashScreen.hideAsync();
  //     }, 2000); // 2 seconds delay
  //   }
  // }, [loaded, appFirstOpened]);

  // Display splash screen while resources are loading
  if (isSplashVisible) {
    return <SplashAnimation />;
  }

  return <RootLayoutNav appFirstOpened={appFirstOpened} />;
}

type RootLayoutNavTypes = {
  appFirstOpened: boolean | null;
};

function RootLayoutNav({ appFirstOpened }: RootLayoutNavTypes) {
  // NewGameContext states
  const [allPlayersInGame, setAllPlayersInGame] = useState<object[]>([]);
  const [playersInGame, setPlayersInGame] = useState<object[]>([]);
  const [eliminatedPlayers, setEliminatedPlayers] = useState<object[]>([]);
  const [selectedPlayersForElimination, setSelectedPlayersForElimination] =
    useState<object[]>([]);

  const [witchProtectionUsed, setWitchProtectionUsed] =
    useState<boolean>(false);
  const [convertedByAlphaWerewolf, setConvertedByAlphaWerewolf] = useState<
    string | null
  >(null);
  const [cupidBond, setCupidBond] = useState(false);

  return (
    <GestureHandlerRootView className="flex-1">
      <SoundProvider>
        <BottomSheetModalProvider>
          <NewGameContext.Provider
            value={{
              allPlayersInGame,
              setAllPlayersInGame,
              eliminatedPlayers,
              setEliminatedPlayers,
              selectedPlayersForElimination,
              setSelectedPlayersForElimination,
              playersInGame,
              setPlayersInGame,
              witchProtectionUsed,
              setWitchProtectionUsed,
              convertedByAlphaWerewolf,
              setConvertedByAlphaWerewolf,
              cupidBond,
              setCupidBond,
            }}
          >
            <ThemeProvider value={DefaultTheme}>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen
                  name="index"
                  options={{ gestureEnabled: false }}
                  initialParams={{ appFirstOpened }}
                />

                {/* New game screens */}
                <Stack.Screen
                  name="(new_game)/new_game"
                  options={{ presentation: "card" }}
                />
                <Stack.Screen name="(new_game)/players_names" />
                <Stack.Screen name="(new_game)/scan_intro" />
                <Stack.Screen name="(new_game)/players_scans" />
                <Stack.Screen name="(new_game)/view_roles" />
                <Stack.Screen
                  name="(new_game)/roles_modal"
                  options={{ presentation: "modal" }}
                />
                <Stack.Screen
                  name="(new_game)/game_winner"
                  options={{ gestureEnabled: false }}
                />
                <Stack.Screen
                  name="(new_game)/night_time"
                  options={{ gestureEnabled: false }}
                />
                <Stack.Screen
                  name="(new_game)/day_time"
                  options={{ gestureEnabled: false }}
                />
                <Stack.Screen
                  name="(new_game)/game_menu"
                  options={{ presentation: "modal" }}
                />
                <Stack.Screen
                  name="shared/paywall"
                  options={{ presentation: "modal" }}
                />

                <Stack.Screen
                  name="shared/terms"
                  options={({ route }: any) => ({
                    presentation:
                      route.params?.presentation === "modal" ? "modal" : "card",
                  })}
                />
                <Stack.Screen
                  name="shared/privacy_policy"
                  options={({ route }: any) => ({
                    presentation:
                      route.params?.presentation === "modal" ? "modal" : "card",
                  })}
                />
              </Stack>
              <FlashMessage position="top" />
            </ThemeProvider>
          </NewGameContext.Provider>
        </BottomSheetModalProvider>
      </SoundProvider>
    </GestureHandlerRootView>
  );
}
