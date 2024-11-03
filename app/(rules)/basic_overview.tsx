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
        teams: the Village and the Werewolves and the roles are chosen at
        random.
      </Text>

      <Text className="text-sm text-gray-300 mb-3">
        The game is played in series of alternating "Night" and "Day" phases.
      </Text>

      <Text className="text-sm text-gray-300 mb-3">
        <Text className="font-bold">During the Night:</Text>
      </Text>

      <Text className="text-sm text-gray-300 mb-3">
        In the night everyone closes their eyes and the Narrator of the game
        awakes the players with special roles so they open their eyes without
        moving much so they don't get sensed by the other people around them.
        The people who receive a special role, will see an explanation of their
        ability in the description and can see more information.
      </Text>
      <Text className="text-sm text-gray-300 mb-3">
        All the special roles in a basic game of Werewolf are: Werewolves, Seer
        and Doctor. The Villager is not a special role, since he doesn't wake up
        (open his eyes) during the night to take any action. To view all the
        roles and their abilities, you can see them from the{" "}
        <Text className="text-blue-300 underline">Roles option</Text>.
      </Text>

      <Text className="text-sm text-gray-300 mb-3">
        The Werewolf/ves will be woken up first and by pointing, they will
        choose a player to eliminate. They all must decide on one player to be
        eliminated. From there the Narrator will the tell all the Village to go
        back to sleep and she/he will wake up the next special role of the game
        until all of the roles are woken and have taken action.
      </Text>

      <Text className="text-sm text-gray-300 mb-3">
        At the end of the night, after all of the special roles have been woken
        up, the Narrator will put everyone back to sleep and figure out if there
        is anyone in the game that was eliminated during the night. After this,
        he will anounce that it is Day time and let the whole village know if
        anyone was eliminated during the night without revealing their role to
        everyone.
      </Text>

      <Text className="text-sm text-gray-300 mb-3">
        <Text className="font-bold">During the Day:</Text>
      </Text>
      <Text className="text-sm text-gray-300 mb-3">
        All the players are 'awake' (with open eyes) and they discuss the player
        that died during the last night if any. They should try to ask each
        other and figure out who are the bad roles (Werewolves, Alpha Werewolf,
        Wolf Cub) by way of reasoning and identifying who is lying. The way a
        person is eliminated during the day is by way of being voted-out. Any
        player can start a bid to vote out a player and if 50%+ of the Village
        agrees, the player will be eliminated during the day time.
      </Text>
      <Text className="text-sm text-gray-300 mb-3">
        The time for discussion during the Day time is around 5 minutes in which
        anyone is open to asking anyone else any questions in order to get more
        information and catch someone into lying. Players can accuse others of
        being a werewolf or defend themselves if suspected. The objective is to
        figure out who the Werewolves are.
      </Text>

      <Text className="text-sm text-gray-300 mb-3">
        At the same time, the objective of the Werewolves and all the other
        special bad roles is to remain undetected so this way they don't get
        voted out during the day phase. They should by definition lie if asked
        if they are the Werewolf and decive people into thinking they are the
        good guys.
      </Text>

      <Text className="text-sm text-gray-300 mb-3">
        <Text className="font-bold">
          The goal of the Village is to eliminate all Werewolves, while the
          Werewolves aim to outnumber the Villagers.
        </Text>{" "}
      </Text>
      <Text className="text-sm text-gray-300 mb-3">
        A special role called Tanner, can independently win the game if he gets
        eliminated or voted out.
      </Text>

      <Text className="text-sm text-gray-300 mb-3">
        <Text className="font-bold">
          Players should use logic, observation, and strategic lies depending on
          their role. They should all play and follow the agenda of their group
          to either eliminate all the bad guys, or the good guys or win
          independently based on their randomly-assigned role in the game.
        </Text>
      </Text>

      <Text className="text-sm text-gray-300 mb-3">
        The Narrator guides each phase, announcing events without revealing any
        player’s identity, keeping the game tense and exciting.
      </Text>

      <Text className="text-sm text-gray-300 mb-3 pb-3">
        The Narrator ensures smooth gameplay by guiding each phase, enforcing
        rules, and moderating discussions. Whoever is eliminated throughout the
        game, should not say anything or give any hints to the guys who are
        still in the game.
      </Text>
    </ScrollView>
  </SafeAreaView>
);

export default BasicOverview;
