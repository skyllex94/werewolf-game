import React from "react";
import { Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import RulesTopPane from "@/components/Rules/RulesTopPane";

const GameSetup = () => (
  <SafeAreaView className="flex-1 bg-gray-900">
    <StatusBar style="light" />
    <RulesTopPane iconColor="white" />

    <ScrollView className="p-5 bg-gray-900">
      <Text className="text-xl font-bold text-white mb-4 text-center">
        Game Setup
      </Text>

      <Text className="text-sm text-gray-300 mb-3">
        To set up a game of Werewolf, gather a group of players. The ideal
        number is between 6 to 20 players, with at least one Werewolf among
        them. More players allow for a greater variety of roles and strategies.
      </Text>

      <Text className="text-sm text-gray-300 mb-3">
        <Text className="font-bold">Step 1: Choose Roles</Text> - Determine the
        roles to include in the game. A standard setup includes:
        <Text className="italic">
          {" "}
          5-6 Villagers, 2 Werewolves, 1 Seer and 1 Doctor.
        </Text>{" "}
        Additional roles like the all the other roles available can be added for
        complexity and interesting twists.
      </Text>

      <Text className="text-sm text-gray-300 mb-3">
        <Text className="font-bold">Step 2: Assign Roles</Text> - Each player
        should be assigned a secret role at random. For this the narrator who
        will guide the game, will choose the roles and the algorithm will
        automatically assign roles to each player. Then the narrator should
        present each QR code to each player so they can scan and see their role
        for the game. Make sure players do not reveal their roles to others,
        only the narrator knows each players' role.
      </Text>

      <Text className="text-sm text-gray-300 mb-3">
        <Text className="font-bold">Step 3: Explain the Rules</Text> - Before
        starting, ensure all players understand their roles, abilities, and the
        overall game flow. If some of the players do not know their abilities,
        they can always be guided to review more information about their
        abilities from the "More info" from the scanned QR code they receive.
      </Text>

      <Text className="text-sm text-gray-300 mb-3">
        The game consists of{" "}
        <Text className="font-bold">alternating Night and Day phases.</Text>
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

      <Text className="text-sm text-gray-300 mb-3">
        - During the Day, players discuss who they believe is a Werewolf and
        vote to eliminate a player they suspect. In order to vote out a player,
        50%+ of the Village needs to decide on a player to vote out from the
        game. In about 3 to 5 minutes, all the players in the Day time should
        decide on eliminating someone and if they cannot agree on anyone to
        eliminate in this time period, the Village goes back to sleep and wait
        to the next day to decide on someone to vote out.
      </Text>

      <Text className="text-sm text-gray-300 mb-3">
        The game ends when either all Werewolves and bad Special roles are
        eliminated or the Werewolves outnumber the Villagers and all the good
        Special roles.
      </Text>

      <Text className="text-sm text-gray-300 mb-3">
        Finally, Werewolf is about deception, deduction, and strategy. Encourage
        them to engage in lively discussions and enjoy the social aspect of the
        game!
      </Text>
    </ScrollView>
  </SafeAreaView>
);

export default GameSetup;
