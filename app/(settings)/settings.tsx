import SubscriptionSection from "@/components/Settings/SubscriptionSection";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";

const SettingsScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      {/* <Text className="text-2xl pt-6 font-bold text-center text-white">
        Settings
      </Text> */}

      <View className="px-4">
        {/* Header */}

        {/* Premium Upgrade Banner */}
        <TouchableOpacity className="mt-6 p-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500">
          <Text className="text-lg font-semibold text-white">
            Upgrade to Premium
          </Text>
          <Text className="text-xs text-gray-200">
            Unlock 10+ Premium Features
          </Text>
          <View className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full px-3 py-1">
            <Text className="text-blue-500 font-medium">Upgrade</Text>
          </View>
        </TouchableOpacity>

        <SubscriptionSection />

        {/* Settings Options */}
        <View className="mt-6 mb-3 space-y-1">
          {renderSettingsOption("Restore Purchase")}
          {renderSettingsOption("Rate the App")}

          {/* General Section */}
          <Text className="mt-4 text-sm font-semibold text-gray-400">
            General
          </Text>
          {renderSettingsOption("Privacy Policy")}
          {renderSettingsOption("Terms & Conditions")}
          {renderSettingsOption("Share Feedback")}
          {renderSettingsOption("Report a Bug")}

          {/* Our Apps Section */}
          <Text className="my-3 text-sm font-semibold text-gray-400">
            Our Apps
          </Text>
          <View className="flex-row space-x-4 mt-2">
            {/* <AppIcon name="MicronVPN" />
            <AppIcon name="WaterDrop" /> */}
          </View>

          {/* About Section */}
          <Text className="my-3 text-sm font-semibold text-gray-400">
            About
          </Text>
          {renderSettingsOption("Tell Friends")}
          <View className="flex-row justify-between items-center py-4">
            <Text className="text-lg text-white">App Version</Text>
            <Text className="text-gray-400">1.1.5</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

// Helper Components
const renderSettingsOption = (title: string) => (
  <TouchableOpacity className="p-4 rounded-lg bg-gray-800">
    <Text className="text-white">{title}</Text>
  </TouchableOpacity>
);

const AppIcon = ({ name }: { name: string }) => (
  <View className="items-center">
    {/* Replace with actual icons */}
    <Image
      source={{ uri: name }}
      style={{
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: "#333",
      }}
    />
    <Text className="text-white mt-2">{name}</Text>
  </View>
);

export default SettingsScreen;
