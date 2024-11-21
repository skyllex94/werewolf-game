import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import FlashMessage from "react-native-flash-message";
import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Global async-stored sound control
import { SoundProvider } from "./../contexts/SoundContext";
import NewGameContext from "@/contexts/NewGameContext";

// Bottom sheet imports
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Bronzetti_SC_Condensed: require("../assets/fonts/Bronzetti-SC-Condensed-Bold.otf"),
    Bronzetti_Condensed: require("../assets/fonts/Bronzetti-Condensed-Bold.otf"),
    ...FontAwesome.font,
  });

  const [appFirstOpened, setAppFirstOpened] = useState<boolean | null>(() => {
    const checkFirstTimeOpen = async () => {
      try {
        const firstOpen = await AsyncStorage.getItem("appFirstOpened");
        console.log("firstOpen1:", firstOpen);

        if (!firstOpen) {
          // If app is opened for the first time
          await AsyncStorage.setItem("appFirstOpened", "true");
          setAppFirstOpened(true);
        } else {
          setAppFirstOpened(false);
        }
      } catch (err) {
        console.error("Error checking first open:", err);
        setAppFirstOpened(false);
      }
    };

    checkFirstTimeOpen(); // Run the check on initialization

    return null; // Default value before state is set
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  // useEffect(() => {
  //   if (loaded) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [loaded]);

  if (!loaded) {
    return null;
  }

  // Main UI branch of the app
  return loaded && <RootLayoutNav appFirstOpened={appFirstOpened} />;
}

type RootLayoutNavTypes = {
  appFirstOpened: boolean | null;
};

function RootLayoutNav({ appFirstOpened }: RootLayoutNavTypes) {
  console.log("appFirstOpened2:", appFirstOpened);
  // NewGameContext state - defined in scan_intro
  const [allPlayersInGame, setAllPlayersInGame] = useState<object[]>([]);
  // NewGameContext - defined in scan_intro
  const [playersInGame, setPlayersInGame] = useState<object[]>([]);

  // NewGameContext - defined in RoleEliminatedBS
  const [eliminatedPlayers, setEliminatedPlayers] = useState<object[]>([]);
  const [selectedPlayersForElimination, setSelectedPlayersForElimination] =
    useState<object[]>([]);

  // Individual roles states
  // Witch state
  const [witchProtectionUsed, setWitchProtectionUsed] =
    useState<boolean>(false);
  // Alpha Werewolf state
  const [convertedByAlphaWerewolf, setConvertedByAlphaWerewolf] = useState<
    string | null
  >(null);
  // Cupid state
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
              // Witch state
              witchProtectionUsed,
              setWitchProtectionUsed,
              // Alpha Werewolf
              convertedByAlphaWerewolf,
              setConvertedByAlphaWerewolf,
              // Cupid state
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
                <Stack.Screen name="main" options={{ gestureEnabled: false }} />

                {/* New game screens */}
                <Stack.Screen
                  name="(new_game)/new_game"
                  options={{ presentation: "card", gestureEnabled: false }}
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
