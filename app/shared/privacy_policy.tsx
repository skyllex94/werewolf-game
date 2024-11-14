import RulesTopPane from "@/components/Rules/RulesTopPane";
import React from "react";
import {
  View,
  Text,
  ScrollView,
  Linking,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

const PrivacyPolicy: React.FC = () => {
  const handleEmailPress = () => {
    Linking.openURL("mailto:zionstudiosapps@gmail.com");
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <RulesTopPane iconColor="white" />
      <ScrollView className="">
        <View className="p-5">
          <Text className="text-xl font-bold text-white mb-3">
            Privacy Policy
          </Text>
          <Text className="text-xs text-slate-400 mb-5">
            Effective Date: 11/13/2024
          </Text>
          <Text className="text-sm text-white mb-4">
            Zion Studios ("we," "us," or "our") operates the Werewolf: Save the
            Village app (the "App"). This Privacy Policy outlines how we handle
            your information while you use our App. By accessing or using the
            App, you agree to the terms of this Privacy Policy.
          </Text>

          <Text className="text-lg font-semibold text-white mt-5 mb-2">
            1. Information We Collect
          </Text>
          <Text className="text-sm text-white mb-4">
            We prioritize your privacy and have designed Werewolf: Save the
            Village to operate without collecting or tracking any personal
            information. The App does not require account creation, nor does it
            access, store, or share any user data.
          </Text>
          <View className="pl-4 mb-4">
            <Text className="text-sm text-white mb-2">
              • No Personal Data Collection: We do not collect personal
              information such as names, email addresses, phone numbers, or
              billing details.
            </Text>
            <Text className="text-sm text-white mb-2">
              • No Tracking or Analytics: We do not use tracking technologies
              (e.g., cookies, analytics tools) within the App.
            </Text>
            <Text className="text-sm text-white mb-2">
              • No Web-Based Tracking: We do not track users’ activities across
              the web, and we do not collect information for advertising or
              marketing purposes.
            </Text>
            <Text className="text-sm text-white mb-2">
              • No Data Uploads: Any data you input, including in-app settings
              or preferences, remains local to your device and is not
              transmitted outside the App.
            </Text>
          </View>

          <Text className="text-lg font-semibold text-white mt-5 mb-2">
            2. Local Storage of User Content
          </Text>
          <Text className="text-sm text-white mb-4">
            Werewolf: Save the Village is designed as a local-only experience,
            meaning that all information and content, including any photos taken
            or uploaded within the App, are stored locally on your device.
          </Text>
          <View className="pl-4 mb-4">
            <Text className="text-sm text-white mb-2">
              • Photos and Media: If the App allows you to take or upload
              photos, these files are stored solely on your device and are not
              accessible by us or any third-party services.
            </Text>
            <Text className="text-sm text-white mb-2">
              • Game Data: Any in-game progress, player information, or settings
              are stored locally within the App’s data on your device. This data
              is not shared with us or any third-party servers.
            </Text>
          </View>

          <Text className="text-lg font-semibold text-white mt-5 mb-2">
            3. Data Security
          </Text>
          <Text className="text-sm text-white mb-4">
            We take data security seriously and are committed to ensuring that
            all information stored locally on your device remains secure. We
            recommend that you protect your device using a secure password and
            enable any available device security features to prevent
            unauthorized access to your data within the App.
          </Text>

          <Text className="text-lg font-semibold text-white mt-5 mb-2">
            4. Your Choices
          </Text>
          <Text className="text-sm text-white mb-4">
            Since Werewolf: Save the Village does not collect, store, or
            transmit your data, there are no privacy choices or settings related
            to personal data within the App. However, you may choose to clear
            App data by deleting or resetting the App on your device to remove
            any locally stored game data or settings.
          </Text>

          <Text className="text-lg font-semibold text-white mt-5 mb-2">
            5. Changes to this Privacy Policy
          </Text>
          <Text className="text-sm text-white mb-4">
            We may update this Privacy Policy from time to time. By continuing
            to use the App after any updates, you acknowledge and accept the
            revised terms.
          </Text>

          <Text className="text-lg font-semibold text-white mt-5 mb-2">
            6. Contact Us
          </Text>
          <Text className="text-sm text-white mb-4">
            If you have any questions, concerns, or feedback regarding this
            Privacy Policy, please contact us at:
          </Text>
          <TouchableOpacity onPress={handleEmailPress}>
            <Text className="text-sm text-sky-400 underline mb-5">
              zionstudiosapps@gmail.com
            </Text>
          </TouchableOpacity>

          <Text className="text-xl font-semibold text-white mt-5 mb-2">
            Conclusion
          </Text>
          <Text className="text-sm text-white mb-10">
            This Privacy Policy is intended to provide transparency about our
            approach to user privacy for Werewolf: Save the Village. Our
            commitment to your privacy ensures that no data is collected,
            shared, or transmitted outside of your device. Thank you for playing
            Werewolf: Save the Village and trusting Zion Studios.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyPolicy;
