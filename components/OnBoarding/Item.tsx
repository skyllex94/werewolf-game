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
    await AsyncStorage.setItem("appFirstOpened", "false");
    router.replace("/main");
  }

  return (
    <SafeAreaView style={[{ width }]}>
      {item.id === 6 ? (
        <View>
          <TouchableOpacity
            onPress={sendToMainScreen}
            className="close-button z-10 absolute top-4 right-4 rounded-full p-3"
          >
            <AntDesign name="close" size={20} color="#94a3b8" />
          </TouchableOpacity>

          <View className="items-center justify-center">
            <Image
              source={item.image}
              className="items-center justify-center"
              style={[{ width: width, height: 450 }]}
            />
          </View>

          <ScrollView>
            <Text className="font-bold text-center text-[28px] px-6 mb-4 text-slate-600">
              {item.title}
            </Text>

            <View className="premium-features items-center justify-center">
              <View className="flex-row items-center gap-x-5 m-1">
                <FontAwesome6 name="toolbox" size={24} color="#334155" />
                <View className="flex-1 gap-y-1">
                  <Text className="text-slate-600 text-[15px] font-semibold">
                    All Editing Tools
                  </Text>
                  <Text className="text-slate-500 font-light">
                    Unlock all editing tools: Dates, Initials, Images, Custom
                    Text, Checks and more to come.
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center gap-x-5 m-1">
                <MaterialCommunityIcons
                  name="file-document-edit"
                  size={24}
                  color="#334155"
                />
                <View className="flex-1 gap-y-1">
                  <Text className="text-slate-600 text-[15px] font-semibold">
                    15+ Document Templates
                  </Text>
                  <Text className="text-slate-500 font-light">
                    Try different templates for direct editing with more being
                    added on a regular basis.
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center gap-x-5 m-1">
                <MaterialIcons
                  name="camera-enhance"
                  size={24}
                  color="#334155"
                />
                <View className="flex-1 gap-y-1">
                  <Text className="text-slate-600 text-[15px] font-semibold">
                    Camera Scanning
                  </Text>
                  <Text className="text-slate-500 font-light">
                    Get included camera scanning and organizing your documents
                    in a safe environment.
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      ) : (
        <View>
          <View className="items-center justify-center">
            <Image
              source={item.image}
              className="items-center justify-center"
              style={[{ width: width, height: 450 }]}
            />
          </View>

          <View>
            <Text className="font-bold text-center text-[28px] px-6 mb-3 text-slate-600">
              {item.title}
            </Text>
            <Text className="font-light text-center px-8 text-slate-500">
              {item.description}
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
