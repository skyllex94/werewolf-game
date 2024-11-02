import React from "react";
import { Text, ScrollView } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import RulesTopPane from "@/components/Rules/RulesTopPane";

const BasicOverview = () => (
  <SafeAreaView className="flex-1 bg-gray-900">
    <StatusBar style="light" />
    <RulesTopPane iconColor="white" />

    <ScrollView className="p-5 bg-gray-900">
      <Text className="text-xl font-bold text-white mb-4 text-center">
        Basic Overview
      </Text>

      <Text className="text-sm text-gray-300 mb-3">
        The game of Werewolf is a social deduction game where players are
        assigned secret roles in a village filled with a one or a couple
        werewolves. Each round, players use logic and persuasion to identify
        werewolves or to hide their own identity. The game involves two main
        teams: the Village and the Werewolves. Additional roles with unique
        abilities can also influence the game, adding complexity to each phase.
      </Text>

      <Text className="text-sm text-gray-300 mb-3">
        Werewolf is played in a series of alternating Night and Day phases.
        During the Night, players with special roles (such as Werewolves,
        Bodyguard, and Witch){" "}
        <Text className="font-bold">perform actions in secret</Text>, guided by
        the Narrator. During the Day, all players discuss, deduce, and vote to
        eliminate a suspected werewolf.
      </Text>

      <Text className="text-sm text-gray-300 mb-3">
        <Text className="font-bold">
          The goal for the Village is to eliminate all Werewolves, while the
          Werewolves aim to outnumber the Villagers.
        </Text>{" "}
        Some players, such as the Tanner, have unique goals that add a twist to
        the game's objective. The game continues until one team fulfills its
        winning condition.
      </Text>

      <Text className="text-sm text-gray-300 mb-3">
        Players should use logic, observation, and strategic lies (if they’re a
        werewolf or a role with a hidden agenda) to influence others’ decisions.
      </Text>

      <Text className="text-sm text-gray-300 mb-3">
        The Narrator guides each phase, announcing events without revealing any
        player’s identity, keeping the game tense and exciting.
      </Text>

      <Text className="text-sm text-gray-300 mb-3">
        The Narrator ensures smooth gameplay by guiding each phase, enforcing
        rules, and moderating discussions. Players can accuse others of being a
        werewolf or defend themselves if suspected. The game is won when one
        team accomplishes its objectives, either by eliminating threats to the
        Village or the Werewolves achieving dominance.
      </Text>
    </ScrollView>
  </SafeAreaView>
);

export default BasicOverview;
