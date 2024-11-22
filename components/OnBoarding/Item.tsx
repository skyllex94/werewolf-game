import {
  View,
  Text,
  Image,
  useWindowDimensions,
  SafeAreaView,
} from "react-native";
import React from "react";

import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  AntDesign,
  FontAwesome5,
  FontAwesome6,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { useRouter } from "expo-router";

// Define the type for item prop
type OnBoardingItemProps = {
  item: {
    id: number;
    title: string;
    description?: string;
    image: any;
  };
};

export default function OnBoardingItem({ item }: OnBoardingItemProps) {
  const router = useRouter();
  const { width } = useWindowDimensions();

  // Function to handle navigation to the main screen
  async function sendToMainScreen(): Promise<void> {
    await AsyncStorage.setItem("isFirstOpen", "false");
    router.replace("/main");
  }

  return (
    <View style={[{ width }]}>
      {item.id === 4 ? (
        <View>
          <TouchableOpacity
            onPress={sendToMainScreen}
            className="close-button z-10 absolute top-10 right-6 rounded-full p-3"
          >
            <AntDesign name="close" size={20} color="#94a3b8" />
          </TouchableOpacity>

          <View className="items-center justify-center">
            <Image
              source={item.image}
              className="items-center justify-center mb-10"
              style={[{ width: width, height: 450 }]}
            />
          </View>

          <ScrollView>
            <Text className="font-bold text-center text-[28px] px-6 mb-4 text-slate-200">
              {item.title}
            </Text>

            <View className="premium-features items-center justify-center">
              <View className="flex-row items-center gap-x-5 m-1">
                <FontAwesome5 name="users" size={26} color="white" />
                <View className="flex-1 gap-y-1 pr-4">
                  <Text className="text-slate-200 text-[15px] font-semibold">
                    14+ Different Roles
                  </Text>
                  <Text className="text-slate-300 font-light">
                    Play with all Roles in the game and more to come for
                    exciting outcomes and scenarios.
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center gap-x-5 m-1">
                <MaterialCommunityIcons
                  name="image-text"
                  size={32}
                  color="white"
                />
                <View className="flex-1 gap-y-1 pr-4">
                  <Text className="text-slate-200 text-[15px] font-semibold">
                    Saving and Storing Users
                  </Text>
                  <Text className="text-slate-300 font-light">
                    Snap photos of the players and store them with their photos
                    for further use in following games.
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center gap-x-5 m-1">
                <FontAwesome6 name="ranking-star" size={26} color="white" />
                <View className="flex-1 gap-y-1 pr-4">
                  <Text className="text-slate-200 text-[15px] font-semibold">
                    More Game Outcomes
                  </Text>
                  <Text className="text-slate-300 font-light">
                    Allows for deeper strategic thinking and a wider range of
                    outcomes with different winners.
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      ) : (
        <View>
          <View className="items-center justify-center ">
            <Image
              source={item.image}
              className="items-center justify-center mb-10"
              style={[{ width: width, height: 450 }]}
            />
          </View>

          <View>
            <Text className="font-bold text-center text-[28px] px-6 mb-3 text-slate-200">
              {item.title}
            </Text>
            <Text className="font-light text-center px-8 text-slate-300">
              {item.description}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}
