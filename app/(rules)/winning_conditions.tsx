import React from "react";
import { Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import RulesTopPane from "@/components/Rules/RulesTopPane";

const WinningConditions = () => (
  <SafeAreaView className="flex-1 bg-gray-900">
    <StatusBar style="light" />
    <RulesTopPane iconColor="white" />

    <ScrollView className="p-5 bg-gray-900">
      <Text className="text-xl font-bold text-white mb-4 text-center">
        Winning Conditions
      </Text>

      <Text className="text-sm text-gray-300 mb-3">
        The game of Werewolf has distinct winning conditions depending on the
        roles and teams involved. The primary teams are the Villagers and the
        Werewolves, each with specific goals. In addition, special roles like
        the Tanner and certain game mechanics can influence how the game ends.
        Below is an overview of each team's objective and additional conditions
        for special roles.
      </Text>

      <Text className="text-sm text-gray-300 mb-3">
        <Text className="font-bold">Villagers' Goal:</Text> The Villagers win if
        they eliminate all Werewolves. However, the game may continue if certain
        special roles with unique winning conditions are still in play, as they
        can affect the game outcome.
      </Text>

      <Text className="text-sm text-gray-300 mb-3">
        <Text className="font-bold">Werewolves' Goal:</Text> The Werewolves win
        if they outnumber or match the remaining Villagers. In this scenario,
        the Werewolves can overpower the Villagers, ensuring their victory. But
        like the Villagers, their win can be delayed if special roles remain
        active.
      </Text>

      <Text className="text-sm text-gray-300 mb-3">
        <Text className="font-bold">Special Roles with Unique Goals:</Text> Some
        roles have specific win conditions that can influence the game. These
        players might not be aligned fully with either the Villagers or
        Werewolves. Here’s a breakdown of roles with unique win conditions and
        how they affect the game:
      </Text>

      <Text className="text-sm text-gray-300 mb-3">
        <Text className="font-bold">Tanner:</Text> The Tanner wins if they are
        eliminated by the Villagers or the Werewolves. Their sole purpose is to
        lose their life, ending the game in their favor if they succeed. If the
        Tanner is in play, their elimination could mean a unique ending to the
        game, with neither the Villagers nor the Werewolves achieving victory.
      </Text>

      {/* <Text className="text-sm text-gray-300 mb-3">
        <Text className="font-bold">Cupid & the Lovers:</Text> When Cupid pairs
        two players as Lovers, those players win if they are the last two
        players standing, regardless of team alignment. If one Lover dies, the
        other also dies. If both Lovers are still in the game, the game
        continues until their condition is either met or they are eliminated.
      </Text> */}

      <Text className="text-sm text-gray-300 mb-3">
        <Text className="font-bold">Prince:</Text> The Prince has no special win
        condition but adds complexity by surviving the first elimination vote.
        Their presence can delay the Villagers’ or Werewolves’ win if they are
        falsely accused early in the game.
      </Text>

      <Text className="text-sm text-gray-300 mb-3">
        <Text className="font-bold">Hunter:</Text> The Hunter can influence the
        outcome by eliminating a player upon their own elimination. This can
        sway the balance between teams if used strategically, especially if the
        game is close to either team’s victory.
      </Text>

      <Text className="text-sm text-gray-300 mb-3">
        <Text className="font-bold">Example Scenarios:</Text>
      </Text>

      <Text className="text-sm text-gray-300 mb-3">
        <Text className="font-bold">Example 1:</Text> There are three players
        left: two Villagers and one Werewolf. In this scenario, the Villagers
        are still able to vote out the Werewolf, leading to a Villager win.
        However, if the Tanner is one of the Villagers and gets voted out, the
        Tanner would win, ending the game in their favor instead.
      </Text>

      <Text className="text-sm text-gray-300 mb-3">
        <Text className="font-bold">Example 2:</Text> There are four players
        remaining: two Villagers, one Werewolf, and the Doctor. The Werewolf
        attacks one of the Villagers during the Night phase, but the Doctor uses
        their ability to save the Villager. The game doesn’t end because the
        Doctor’s intervention prevents the Werewolf from successfully reducing
        the Villager count. This protection allows the Villagers to survive
        another round, giving them an additional chance to identify and
        eliminate the Werewolf.
      </Text>

      <Text className="text-sm text-gray-300 mb-3">
        <Text className="font-bold">Example 3:</Text> If only one Werewolf and
        one Villager remain, the Werewolf wins due to outnumbering the Villager.
        However, if the Hunter is eliminated in this situation, they can take
        the Werewolf down with them, resulting in a Villager win.
      </Text>

      <Text className="text-sm text-gray-300 mb-3">
        <Text className="font-bold">Example 4:</Text> The game has two
        Werewolves, one Villager, and a Tanner. If the Villager votes out the
        Tanner, the Tanner wins. However, if the Villager or Werewolves
        eliminate the Tanner without realizing it, they’ll lose the chance for
        victory as the Tanner would win upon their elimination.
      </Text>

      <Text className="text-sm text-gray-300 mb-3">
        <Text className="font-bold">Example 5:</Text> The game is down to one
        Werewolf, two Villagers, and the Bodyguard. During the Night phase, the
        Werewolf attacks one of the Villagers. However, the Bodyguard has chosen
        to protect that Villager. In this case, the Bodyguard sacrifices
        themselves and dies in place of the Villager. Although the Villager is
        saved, the game continues as the Werewolf still remains in play. The
        sacrifice buys the Villagers more time, allowing them another chance to
        vote out the Werewolf in the Day phase.
      </Text>

      <Text className="text-sm text-gray-300 mb-3">
        <Text className="font-bold">Example 6:</Text> In a close game with one
        Werewolf, two Villagers, and the Witch remaining, the Werewolf attacks
        during the Night. However, the Witch decides to use her one-time potion
        to kill the Werewolf. This move eliminates the Werewolf immediately,
        granting an unexpected win for the Villagers. The Witch’s intervention
        prevents the Werewolf from outnumbering the Villagers, shifting the
        game’s outcome in the Villagers’ favor and ending it on the spot.
      </Text>

      <Text className="text-sm text-gray-300 mb-3 pb-3">
        In summary, the game’s winning conditions are shaped by the roles in
        play and the strategic choices made by each player. Players must
        carefully consider each role's unique win conditions, as certain special
        roles can lead to unexpected game outcomes. The game is won when either
        team’s goals are met, or when a special role’s unique win condition
        overrides the primary team objectives.
      </Text>
    </ScrollView>
  </SafeAreaView>
);

export default WinningConditions;
