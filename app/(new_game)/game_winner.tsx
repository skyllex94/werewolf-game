import { View, Text, Pressable, Image, BackHandler } from "react-native";
import React, { useRef, useEffect } from "react";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import { StatusBar } from "expo-status-bar";

const GameWinner = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { winner } = params;

  // Navigation
  const navigation = useNavigation();

  // Animation ref
  const animation = useRef<LottieView>(null);

  function viewRoles() {
    router.push("/roles_modal");
  }

  function startNewGame() {
    router.replace("/new_game");
  }

  const handleMainMenu = () => {
    router.replace("/");
  };

  // Effect
  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
      console.log("onback");
      // Do your stuff here
      navigation.dispatch(e.data.action);
    });
  }, []);

  return (
    <View className="items-center justify-center p-5">
      <StatusBar style={"dark"} />
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
            className="absolute left-[-60] top-[-150] h-[120px] w-[120px] drop-shadow-xl"
            source={require("../../assets/images/emojis/villager.png")}
          />
        ) : winner === "bad" ? (
          <Image
            className="absolute left-[-60] top-[-150] h-[120px] w-[120px] drop-shadow-xl"
            source={require("../../assets/images/emojis/werewolf.png")}
          />
        ) : (
          <Image
            className="absolute left-[-60] top-[-150] h-[120px] w-[120px] drop-shadow-xl"
            source={require("../../assets/images/emojis/werewolf.png")}
          />
        )}
      </View>

      <Text className="text-2xl font-bold mb-4">
        {winner === "good" ? "The Village Wins!" : "Werewolves Win!"}
      </Text>
      <Text className="text-lg text-center mb-8 font-light w-[90%]">
        {winner === "good"
          ? "Congratulations to the whole Village for figuring out who the bad guys are. You were able to successfully eliminate all of them in this game."
          : "Great job Werewolves, you were able to successfully eliminate the Village and be unrecognized in doing so."}
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
