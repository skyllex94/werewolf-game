import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useRef, useState } from "react";
import FlashMessage from "react-native-flash-message";
import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Global async-stored sound control
import { SoundProvider } from "./../contexts/SoundContext";
import NewGameContext from "@/contexts/NewGameContext";

// Bottom sheet imports
import BottomSheet, { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  // Main UI branch of the app
  return <RootLayoutNav />;
}

function RootLayoutNav() {
  // NewGameContext state - defined in scan_intro
  const [allPlayersInGame, setAllPlayersInGame] = useState<object[]>([]);
  // NewGameContext - defined in scan_intro
  const [playersLeft, setPlayersLeft] = useState<object[]>([]);
  // NewGameContext - defined in RoleEliminatedBS
  const [eliminatedPlayers, setEliminatedPlayers] = useState<object[]>([]);

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
              playersLeft,
              setPlayersLeft,
            }}
          >
            <ThemeProvider value={DefaultTheme}>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />

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
              </Stack>
              <FlashMessage position="top" />
            </ThemeProvider>
          </NewGameContext.Provider>
        </BottomSheetModalProvider>
      </SoundProvider>
    </GestureHandlerRootView>
  );
}
