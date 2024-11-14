import RulesTopPane from "@/components/Rules/RulesTopPane";
import About from "@/components/Settings/About";
import General from "@/components/Settings/General";
import OurApps from "@/components/Settings/OurApps";
import Subscription from "@/components/Settings/Subscription";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, SafeAreaView } from "react-native";

const SettingsScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <StatusBar style="light" />
      <RulesTopPane iconColor="white" />
      <ScrollView showsVerticalScrollIndicator={false} className="px-4">
        {/* Upgrade Banner, Restore & Rate App*/}
        <Subscription />

        {/* General Section */}
        <General />

        {/* Other Apps Section */}
        <OurApps />

        {/* App Version & Share Options */}
        <About />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;
