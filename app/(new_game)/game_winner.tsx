import { View, Text, Pressable, Image } from "react-native";
import React, { useRef, useEffect, useContext } from "react";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import { StatusBar } from "expo-status-bar";
import SoundContext from "@/contexts/SoundContext";

const GameWinner = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { winner } = params;

  const { setWinSoundEnabled, setSoundtrackEnabled } =
    useContext(SoundContext)!;

  // Navigation
  const navigation = useNavigation();

  // Animation ref
  const animation = useRef<LottieView>(null);

  function viewRoles() {
    router.push({
      pathname: "/roles_modal",
      params: { darkMode: "true" },
    });
  }

  function startNewGame() {
    // Reset sound
    setWinSoundEnabled(false);
    setSoundtrackEnabled(true);
    router.replace("/new_game");
  }

  const handleMainMenu = () => {
    setWinSoundEnabled(false);
    router.replace("/");
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
        {winner === "good"
          ? "The Village Wins!"
          : winner === "bad"
          ? "Werewolves Win!"
          : "The Tanner Wins!"}
      </Text>
      <Text className="text-lg text-white text-center mb-8 font-light w-[90%]">
        {winner === "good"
          ? "Congratulations to the whole Village for figuring out who the bad guys are. You were able to successfully eliminate all of them in this game."
          : winner === "bad"
          ? "Great job Werewolves, you were able to successfully eliminate the Village and be unrecognized in doing so."
          : "The Tanner has been eliminated! The Tanner wins for achieving their goal of being voted out by the Village."}
      </Text>

      <View className="justify-center w-[80%] gap-y-3">
        <Pressable
          onPress={startNewGame}
          className="bg-green-300 p-4 rounded-xl"
        >
          <Text className="font-bold text-center">New Game</Text>
        </Pressable>

        <Pressable onPress={viewRoles} className="bg-green-300 p-4 rounded-xl">
          <Text className="font-bold text-center">View All Roles</Text>
        </Pressable>

        <Pressable
          onPress={handleMainMenu}
          className="bg-slate-200 p-4 rounded-xl border border-gray-400"
        >
          <Text className="font-bold text-center">Main Menu</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default GameWinner;
