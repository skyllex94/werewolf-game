import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next"; // Import useTranslation

type AppInfo = {
  name: string;
  description: string;
  url: string;
  imageSource: any;
};

const appData: AppInfo[] = [
  {
    name: "MicronVPN",
    description: "Fast VPN & Adblocker",
    url: "https://apps.apple.com/us/app/vpn-proxy-master-secure-shield/id1459783875?platform=iphone",
    imageSource: require("../../assets/images/apps_icons/vpn_icon.png"),
  },
  {
    name: "WaterDrop",
    description: "Remove water from speakers",
    url: "https://apps.apple.com/us/app/water-eject-airpods-waterdrop/id6449911513?platform=iphone",
    imageSource: require("../../assets/images/apps_icons/waterdrop.jpg"),
  },
  {
    name: "SimpleSign",
    description: "eSign & Scan Documents",
    url: "https://apps.apple.com/us/app/sign-documents-e-signature-app/id6502412936?platform=iphone",
    imageSource: require("../../assets/images/apps_icons/esign.jpg"),
  },
];

const OurApps: React.FC = () => {
  const { t } = useTranslation();

  const openURL = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  return (
    <View className="gap-y-2 pt-4">
      <Text className="text-white text-[15px] font-light ml-2">
        {t("ourApps")}
      </Text>

      <ScrollView
        className="bg-slate-800 mt-5 rounded-2xl w-full"
        alwaysBounceHorizontal
        alwaysBounceVertical={false}
      >
        <View className="flex-row justify-start h-36 items-center ml-3">
          {appData.map((app, index) => (
            <View key={app.name} className="flex-row items-center">
              <TouchableOpacity
                onPress={() => openURL(app.url)}
                className="justify-center items-start"
              >
                <View className="items-center">
                  <Image
                    className="h-16 w-16 rounded-xl"
                    source={app.imageSource}
                  />
                  <Text className="text-white mt-2">{t(app.name)}</Text>
                  <Text className="text-gray-500 text-[10px] text-center w-20 mt-[.5px]">
                    {t(app.description)}
                  </Text>
                </View>
              </TouchableOpacity>

              {index < appData.length - 1 && (
                <View className="h-16 w-[0.5px] bg-gray-700 mx-3" />
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default OurApps;
