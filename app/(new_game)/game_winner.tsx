import { View, Text, Pressable, Image, Linking } from "react-native";
import React, { useRef, useEffect, useContext } from "react";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import { StatusBar } from "expo-status-bar";
import SoundContext from "@/contexts/SoundContext";
import * as StoreReview from "expo-store-review";
import { useTranslation } from "react-i18next";

const GameWinner = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams();
  const { winner } = params;

  const appStoreUrl = "https://apps.apple.com/us/app/id6738326023";

  const { setWinSoundEnabled, setSoundtrackEnabled } =
    useContext(SoundContext)!;

  // Navigation
  const navigation = useNavigation();

  // Animation ref
  const animation = useRef<LottieView>(null);

  async function requestReview() {
    const isAvailable = await StoreReview.isAvailableAsync();
    if (isAvailable) {
      StoreReview.requestReview();
    } else {
      console.log("In-app review is unavailable. Redirecting to App Store...");
      Linking.openURL(appStoreUrl);
    }
  }

  function viewRoles() {
    router.push({
      pathname: "/roles_modal",
      params: { darkMode: "true" },
    });
  }

  const goToMainMenu = () => {
    // Sound management
    setWinSoundEnabled(false);
    setSoundtrackEnabled(true);

    // Request Review
    requestReview();

    router.replace("/main");
  };

  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();

      navigation.dispatch(e.data.action);
    });

    setWinSoundEnabled(true);
  }, []);

  return (
    <View className="flex-1 bg-slate-900 items-center justify-center p-5">
      <StatusBar style={"light"} />
      <View className="lottie-animation">
        <LottieView
          autoPlay
          ref={animation}
          loop={true}
          style={{
            width: 350,
            height: 350,
          }}
          source={require("../../assets/animations/fireworks.json")}
        />
      </View>

      <View className="emoji-face relative">
        {winner === "good" ? (
          <Image
            className="absolute left-[-60] top-[-150] h-[120px] w-[120px]"
            source={require("../../assets/images/emojis/villager.png")}
          />
        ) : winner === "bad" ? (
          <Image
            className="absolute left-[-60] top-[-150] h-[120px] w-[120px]"
            source={require("../../assets/images/emojis/werewolf.png")}
          />
        ) : (
          <Image
            className="absolute left-[-60] top-[-150] h-[120px] w-[120px]"
            source={require("../../assets/images/emojis/tanner.png")}
          />
        )}
      </View>

      <Text className="text-2xl text-white font-bold mb-4">
        {t(
          winner === "good"
            ? "winningScreen.villageWins"
            : winner === "bad"
            ? "winningScreen.werewolvesWin"
            : "winningScreen.tannerWins"
        )}
      </Text>
      <Text className="text-lg text-white text-center mb-8 font-light w-[90%]">
        {t(
          winner === "good"
            ? "winningScreen.villageVictoryDescription"
            : winner === "bad"
            ? "winningScreen.werewolvesVictoryDescription"
            : "winningScreen.tannerVictoryDescription"
        )}
      </Text>

      <View className="justify-center w-[80%] gap-y-3">
        <Pressable onPress={viewRoles} className="bg-green-300 p-4 rounded-xl">
          <Text className="font-bold text-center">
            {t("winningScreen.viewAllRoles")}
          </Text>
        </Pressable>

        <Pressable
          onPress={goToMainMenu}
          className="bg-slate-200 p-4 rounded-xl border border-gray-400"
        >
          <Text className="font-bold text-center">
            {t("winningScreen.mainMenu")}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default GameWinner;
