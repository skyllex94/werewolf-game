import React from "react";
import { Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import RulesTopPane from "@/components/Rules/RulesTopPane";

const GamePhases = () => (
  <SafeAreaView className="flex-1 bg-gray-900">
    <StatusBar style="light" />
    <RulesTopPane iconColor="white" />

    <ScrollView className="p-5 bg-gray-900">
      <Text className="text-xl font-bold text-white mb-4 text-center">
        Game Phases
      </Text>

      <Text className="text-sm text-gray-300 mb-3">
        The game of Werewolf is divided into two main phases that alternate
        throughout the game: the <Text className="font-bold">Night Phase</Text>{" "}
        and the <Text className="font-bold">Day Phase</Text>. These phases
        determine when certain players can take actions and when accusations and
        eliminations happen.
      </Text>

      <Text className="text-sm text-gray-300 mb-3">
        - During the Night, players with special abilities can perform actions
        in secrecy. The Narrator will wake those roles to "use their powers"
        without revealing their identities by calling for example "Now, let the
        Werewolves wake up and choose a player to eliminate through this night."{" "}
        <Text className="font-bold">
          At the same time all the other players will have their eyes closed,
          and only having the Werewolves with eyes open so they can choose their
          prey.{" "}
        </Text>
        After they do, the narrator will put them back to sleep, making sure
        they are with closed eyes.
      </Text>

      <Text className="text-sm text-gray-300 mb-3 pb-3">
        - During the Day, players discuss who they believe is a Werewolf and
        vote to eliminate a player they suspect. In order to vote out a player,
        50%+ of the Village needs to decide on a player to vote out from the
        game. In about 3 to 5 minutes, all the players in the Day time should
        decide on eliminating someone and if they cannot agree on anyone to
        eliminate in this time period, the Village goes back to sleep and wait
        to the next day to decide on someone to vote out.
      </Text>
    </ScrollView>
  </SafeAreaView>
);

export default GamePhases;
