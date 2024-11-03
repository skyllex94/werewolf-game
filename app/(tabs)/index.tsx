import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";

export default function TabOneScreen() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="justify-center text-[20px] font-bold">Main Tab</Text>
      <View style={styles.separator} lightColor="#eee" />
    </View>
  );
}

const styles = StyleSheet.create({
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
