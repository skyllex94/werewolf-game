import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  useWindowDimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  AntDesign,
  FontAwesome5,
  FontAwesome6,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AllPlans from "./AllPlans";

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
  const [isModalVisible, setModalVisible] = useState(false);

  // Function to handle navigation to the main screen
  async function sendToMainScreen(): Promise<void> {
    await AsyncStorage.setItem("isFirstOpen", "false");
    router.replace("/main");
  }

  // Function to toggle modal visibility
  function toggleModal() {
    setModalVisible(!isModalVisible);
  }

  return (
    <View style={[{ width }]}>
      {item.id === 5 ? (
        <View className="flex-1">
          <TouchableOpacity
            onPress={sendToMainScreen}
            className="close-button z-10 absolute top-10 right-6 rounded-full p-3"
          >
            <AntDesign name="close" size={20} color="#94a3b8" />
          </TouchableOpacity>

          <View className="items-center justify-center relative">
            <Image
              source={item.image}
              className="items-center justify-center mb-6"
              style={[{ width: width, height: 420 }]}
            />
            <View className="absolute bottom-0 py-1 px-8 rounded-xl bg-slate-800">
              <Text className="font-bold text-center text-[28px] text-slate-200">
                {item.title}
              </Text>
            </View>
          </View>

          <TouchableOpacity className="pt-2" onPress={toggleModal}>
            <Text className="text-center underline text-[14px] text-slate-200">
              View All Plans
            </Text>
          </TouchableOpacity>

          <ScrollView
            showsVerticalScrollIndicator={false}
            className="mt-8 mb-2"
          >
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
                  name="account-voice"
                  size={32}
                  color="white"
                />
                <View className="flex-1 gap-y-1 pr-4">
                  <Text className="text-slate-200 text-[15px] font-semibold">
                    Narrator Assistance
                  </Text>
                  <Text className="text-slate-300 font-light">
                    Built-in voice guidance for all roles and easy navigation
                    through the night. Additional languages to be added.
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

          {/* Modal for Subscription Plans */}
          <AllPlans isModalVisible={isModalVisible} toggleModal={toggleModal} />
        </View>
      ) : item.id === 4 ? (
        <View>
          <View className="items-center justify-center">
            <Image
              source={item.image}
              className="items-center justify-center mb-10"
              style={[{ width: width, height: 420 }]}
            />
          </View>

          <View>
            <Text className="font-bold text-center text-[28px] px-6 mb-3 text-slate-200">
              {item.title}
            </Text>

            <Text className="font-light text-center px-8 text-slate-300">
              Before embarking on your journey,{" "}
              <Text className="font-bold">please consider supporting us</Text>.
              This goes a long way and help us continue improving and innovating
              the game as we continue introducing new features.
            </Text>
          </View>
        </View>
      ) : (
        <View>
          <View className="items-center justify-center ">
            <Image
              source={item.image}
              className="items-center justify-center mb-10"
              style={[{ width: width, height: 420 }]}
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
