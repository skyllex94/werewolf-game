import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, Dimensions, Image } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

// Swipable carousel imports
import Carousel from "react-native-reanimated-carousel";

// QR code generator
import QRCode from "react-fancy-qrcode";

interface Item {
  order: number;
  name: string;
  link: string;
  role: string;
  type: string;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function PlayerScanCodesScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { players_roles } = params;

  const he = screenHeight / 1.4;

  // Parse the allPlayersInGame array from JSON
  const allPlayersInGame = players_roles
    ? JSON.parse(players_roles as string)
    : [];

  const [activeIndex, setActiveIndex] = useState(0);

  const carouselRef = useRef<any>(null);

  const renderItem = ({ item }: { item: Item }) => {
    return (
      <View className="flex-1 items-center justify-start pt-16 bg-slate-100 px-5 rounded-2xl shadow-lg">
        <View className="bg-slate-200 h-20 w-20 rounded-lg">
          <Image
            className="h-[100%] w-[100%] rounded-xl"
            source={require("../../assets/images/placeholders/placeholder2.jpg")}
          />
        </View>

        <Text className="text-center font-bold text-[26px] py-4">
          Player {item.order}: {item.name}
        </Text>

        <Text className="text-center text-[18px] font-light py-2 mb-10 ">
          {item.name}, scan this code and view your role in the game through
          your phone.
        </Text>

        {/* QR Code Generator */}
        <View className="w-[80%] h-48 items-center justify-center mt-5">
          <QRCode
            value={item.link}
            size={300}
            margin={10}
            dotScale={0.8}
            dotRadius="80%"
            positionRadius={["5%", "1%"]}
            errorCorrection="H"
          />
        </View>
      </View>
    );
  };

  // Function to handle the Next button press
  function moveToNextBarcode() {
    // Ensure we're not going beyond the last item
    if (activeIndex < allPlayersInGame.length - 1) {
      carouselRef.current?.scrollTo({ index: activeIndex + 1, animated: true });
    } else {
      router.replace({
        pathname: "/view_roles",
        params: { players_roles },
      });
    }
  }

  return (
    <SafeAreaView className="flex-1 h-[100%] bg-gray-900">
      <Text className="text-center font-bold text-[20px] py-4 text-white">
        Role of Each Player
      </Text>
      <Text className="text-center font-light text-[15px] px-10 text-white">
        Swipe to let each player scan their barcode with their phone.
      </Text>

      <Carousel<Item>
        ref={carouselRef}
        width={screenWidth}
        height={screenHeight / 1.4}
        data={allPlayersInGame}
        renderItem={renderItem}
        onSnapToItem={(index) => setActiveIndex(index)}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.85,
        }}
        loop={false}
        pagingEnabled={true}
      />

      <View className="continue-button w-[100%] items-center absolute bottom-10">
        <View className="justify-center my-3">
          <Text className="text-center font-light text-[16px] text-white">
            {activeIndex + 1} / {allPlayersInGame.length}
          </Text>
        </View>
        <TouchableOpacity
          onPress={moveToNextBarcode}
          className="bg-slate-700 items-center justify-center p-4 w-[90%] rounded-xl z-10"
        >
          {activeIndex === allPlayersInGame.length - 1 ? (
            <Text className="text-[16px] font-bold text-white">Start Game</Text>
          ) : (
            <Text className="text-[16px] font-bold text-white">Next</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
