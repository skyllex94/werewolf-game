import React from "react";
import { Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import RulesTopPane from "@/components/Rules/RulesTopPane";

const EliminationRules = () => (
  <SafeAreaView className="flex-1 bg-gray-900">
    <StatusBar style="light" />
    <RulesTopPane iconColor="white" />

    <ScrollView className="p-5 bg-gray-900">
      <Text className="text-xl font-bold text-white mb-4 text-center">
        Elimination Rules
      </Text>

      <Text className="text-sm text-gray-300 mb-3">
        In the game of Werewolf, elimination is a critical aspect that
        determines a player's exit from the game. A player can be eliminated
        either through the group’s decision during the Day Phase or by the
        actions of specific roles during the Night Phase. Here are the general
        rules and specific elimination conditions for each role in the game.
      </Text>

      <Text className="text-sm text-gray-300 mb-3">
        <Text className="font-bold">General Elimination Rules:</Text> During the
        Day Phase, players may accuse and vote to eliminate a player suspected
        of being a Werewolf. The player with the majority of votes is
        eliminated. During the Night Phase, roles like the Werewolves, Hunter,
        and Witch may also cause eliminations based on their abilities.
      </Text>

      <Text className="text-sm text-gray-300 mb-3">
        <Text className="font-bold">Elimination Rules by Role:</Text>
      </Text>

      <Text className="text-sm text-gray-300 mb-3">
        <Text className="font-bold">Villager:</Text> Villagers are eliminated by
        standard voting during the Day Phase or by Werewolves at night. They
        have no special resistance to elimination.
      </Text>

      <Text className="text-sm text-gray-300 mb-3">
        <Text className="font-bold">Werewolf:</Text> Werewolves can be
        eliminated during the Day by a majority vote from Villagers or killed by
        the special roles Hunter or Witch. They aim to avoid detection and
        elimination to ensure their team's survival.
      </Text>

      <Text className="text-sm text-gray-300 mb-3">
        <Text className="font-bold">Seer:</Text> The Seer, a Villager ally, can
        be eliminated by a vote or attacked by Werewolves at night. Losing the
        Seer weakens the Village as they lose a key source of information.
      </Text>

      <Text className="text-sm text-gray-300 mb-3">
        <Text className="font-bold">Doctor:</Text> The Doctor can be eliminated
        through voting or Werewolf attack. They can protect themselves once, but
        beyond that, they are vulnerable to elimination.
      </Text>

      <Text className="text-sm text-gray-300 mb-3">
        <Text className="font-bold">Tanner:</Text> The Tanner wins the game if
        they are eliminated, either by the Villagers during the Day or by the
        Werewolves at night. Unlike other players, the Tanner actively seeks
        elimination.
      </Text>

      <Text className="text-sm text-gray-300 mb-3">
        <Text className="font-bold">Cupid:</Text> If Cupid is eliminated, it has
        no direct effect on other players unless the Lovers, if any, are still
        in the game. Cupid’s role as a matchmaker is complete after pairing
        players.
      </Text>

      <Text className="text-sm text-gray-300 mb-3">
        <Text className="font-bold">Prince:</Text> The Prince is immune being
        voted out in the Daytime elimination vote; if voted out, they reveal
        themselves and survive. However, they can still be eliminated by
        Werewolves or other roles at night.
      </Text>

      <Text className="text-sm text-gray-300 mb-3">
        <Text className="font-bold">Bodyguard:</Text> The Bodyguard can be voted
        out or killed by Werewolves. However, they can defend other players
        against attacks, absorbing the attack if they are still in the game.
      </Text>

      <Text className="text-sm text-gray-300 mb-3">
        <Text className="font-bold">Cursed Villager:</Text> This player is
        initially on the Villagers' team but becomes a Werewolf if attacked by
        them at night. They can be eliminated through voting or by Werewolves
        before turning.
      </Text>

      <Text className="text-sm text-gray-300 mb-3">
        <Text className="font-bold">Priest:</Text> The Priest may bless a player
        once, offering them protection from one elimination. However, the Priest
        themselves can be eliminated by vote or attack.
      </Text>

      <Text className="text-sm text-gray-300 mb-3">
        <Text className="font-bold">Hunter:</Text> If eliminated, the Hunter can
        immediately target and eliminate another player. This ability activates
        upon any form of elimination, whether through voting or Werewolf attack.
      </Text>

      <Text className="text-sm text-gray-300 mb-3">
        <Text className="font-bold">Lycan:</Text> The Lycan appears as a
        Werewolf to the Seer, increasing their risk of being voted out. However,
        they are truly a Villager and can be eliminated like any other Villager.
      </Text>

      <Text className="text-sm text-gray-300 mb-3">
        <Text className="font-bold">Witch:</Text> The Witch has two potions: one
        to save and one to kill. They can be eliminated by vote or Werewolf
        attack and may also use their powers strategically to control
        eliminations.
      </Text>

      <Text className="text-sm text-gray-300 mb-3">
        <Text className="font-bold">Alpha Werewolf:</Text> This Werewolf can
        turn other Villagers into Werewolves under certain conditions. They are
        eliminated like a standard Werewolf but are often a high-priority
        target.
      </Text>

      <Text className="text-sm text-gray-300 mb-3 pb-3">
        <Text className="font-bold">Wolf Cub:</Text> If the Wolf Cub is
        eliminated, the Werewolves become enraged, gaining the ability to
        eliminate two players on the next night. The Wolf Cub can be eliminated
        by any normal means.
      </Text>
    </ScrollView>
  </SafeAreaView>
);

export default EliminationRules;
