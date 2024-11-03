import React from "react";
import { Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import RulesTopPane from "@/components/Rules/RulesTopPane";

const SpecialConditions = () => (
  <SafeAreaView className="flex-1 bg-gray-900">
    <StatusBar style="light" />
    <RulesTopPane iconColor="white" />

    <ScrollView className="p-5 bg-gray-900">
      <Text className="text-xl font-bold text-white mb-4 text-center">
        Special Conditions
      </Text>

      {/* Prince’s Immunity from Voting Eliminations */}
      <Text className="text-sm text-gray-300 mb-3">
        <Text className="font-bold">
          Prince’s Immunity from Voting Eliminations:
        </Text>
        The Prince cannot be eliminated during any Day phase by voting. If
        players attempt to vote out the Prince, their votes are nullified, and
        no one is eliminated that round. This immunity lasts throughout the
        game, forcing the Village to reconsider other potential targets.
      </Text>
      <Text className="text-sm text-gray-300 mb-3">
        <Text className="italic">Example:</Text> On Day 3, all players vote to
        eliminate the Prince, but he reveals his immunity. The Village loses its
        elimination opportunity for the round, adding tension and raising
        suspicion against other players.
      </Text>

      {/* Tanner’s Unique Win Condition */}
      <Text className="text-sm text-gray-300 mb-3">
        <Text className="font-bold">Tanner’s Unique Win Condition:</Text>
        The Tanner wins if he is eliminated (either by Werewolves or by the
        Village). His goal is to act suspiciously, prompting others to vote for
        his elimination. However, his presence creates confusion, as eliminating
        him ends the game with his victory, regardless of other roles in play.
      </Text>
      <Text className="text-sm text-gray-300 mb-3">
        <Text className="italic">Example:</Text> A player begins acting
        erratically, raising suspicion. The Village considers voting them out
        but hesitates, fearing that they may be the Tanner and would win the
        game if eliminated.
      </Text>

      {/* Witch’s Dual Potions (Save/Kill) */}
      <Text className="text-sm text-gray-300 mb-3">
        <Text className="font-bold">Witch’s Dual Potions (Save/Kill):</Text>
        The Witch has two potions—a healing potion to save one player per game
        and a deadly potion to eliminate one player per game. The Witch’s
        decision to save or eliminate a player at Night can completely change
        the game’s direction.
      </Text>
      <Text className="text-sm text-gray-300 mb-3">
        <Text className="italic">Example:</Text> The Witch uses her healing
        potion to save a targeted Villager, prolonging the game. Later, she uses
        her kill potion on a suspected Werewolf, shifting the game balance in
        favor of the Village.
      </Text>

      {/* Doctor’s Continuous Protection */}
      <Text className="text-sm text-gray-300 mb-3">
        <Text className="font-bold">Doctor’s Continuous Protection:</Text>
        The Doctor can protect a player each Night but cannot protect the same
        player on consecutive Nights. This rotating protection makes it
        challenging for the Werewolves to succeed in eliminations and prolongs
        the game by saving a key player repeatedly.
      </Text>
      <Text className="text-sm text-gray-300 mb-3">
        <Text className="italic">Example:</Text> The Doctor protects a crucial
        Villager one Night but switches to another player on the following
        Night, creating uncertainty and delaying the Werewolves’ plans.
      </Text>

      {/* Bodyguard’s Sacrifice */}
      <Text className="text-sm text-gray-300 mb-3">
        <Text className="font-bold">Bodyguard’s Sacrifice:</Text>
        If the Bodyguard protects a player who is attacked by Werewolves, the
        Bodyguard dies in their place. This sacrifice provides a buffer for key
        roles, buying the Village more time to deduce and eliminate the
        Werewolves.
      </Text>
      <Text className="text-sm text-gray-300 mb-3">
        <Text className="italic">Example:</Text> The Bodyguard protects the Seer
        during a critical Night, sacrificing themselves to keep the Seer in the
        game for another round of deductions.
      </Text>

      {/* Hunter’s Retaliation Upon Elimination */}
      <Text className="text-sm text-gray-300 mb-3">
        <Text className="font-bold">
          Hunter’s Retaliation Upon Elimination:
        </Text>
        If the Hunter is eliminated, they can immediately retaliate by choosing
        one player to take down with them. This retaliation can either remove a
        Werewolf or an innocent, potentially shifting the game’s direction based
        on the Hunter’s final decision.
      </Text>
      <Text className="text-sm text-gray-300 mb-3">
        <Text className="italic">Example:</Text> During a Day vote, the Village
        votes out the Hunter. The Hunter retaliates by eliminating a suspected
        Werewolf, giving the Village an advantage.
      </Text>

      {/* Cursed Villager’s Transformation */}
      <Text className="text-sm text-gray-300 mb-3">
        <Text className="font-bold">Cursed Villager’s Transformation:</Text>
        If the Cursed Villager is targeted by the Werewolves, they transform
        into a Werewolf instead of dying. This transformation increases the
        Werewolves’ count, unexpectedly tilting the game’s balance.
      </Text>
      <Text className="text-sm text-gray-300 mb-3">
        <Text className="italic">Example:</Text> A player with the Cursed
        Villager role is attacked by the Werewolves, transforming into one of
        them and jeopardizing the Village’s chances.
      </Text>

      {/* Alpha Werewolf’s Immunity to Detection */}
      <Text className="text-sm text-gray-300 mb-3">
        <Text className="font-bold">
          Alpha Werewolf’s Immunity to Detection:
        </Text>
        The Alpha Werewolf cannot be identified by the Seer during the Night
        phase, appearing as a Villager instead. This immunity makes it difficult
        for the Seer to reliably expose the Werewolves.
      </Text>
      <Text className="text-sm text-gray-300 mb-3">
        <Text className="italic">Example:</Text> The Seer inspects the Alpha
        Werewolf, who appears innocent. The Village mistakenly trusts this
        Werewolf, leading to potential misjudgments.
      </Text>

      {/* Cupid’s Bound Lovers’ Survival Condition */}
      <Text className="text-sm text-gray-300 mb-3">
        <Text className="font-bold">
          Cupid’s Bound Lovers’ Survival Condition:
        </Text>
        If two players are bound as Lovers, they die together if one is
        eliminated. This bond requires both Lovers to survive, whether they are
        Villagers or Werewolves, and can significantly affect the game’s flow.
      </Text>
      <Text className="text-sm text-gray-300 mb-3">
        <Text className="italic">Example:</Text> A Villager and a Werewolf are
        bound as Lovers. If the Villager is voted out, the Werewolf Lover also
        dies, weakening the Werewolf team.
      </Text>
      {/* Lycan’s Mistaken Identity */}
      <Text className="text-sm text-gray-300 mb-3">
        <Text className="font-bold">Lycan’s Mistaken Identity:</Text>
        The Lycan is a Villager who appears as a Werewolf to the Seer, despite
        being innocent. This mistaken identity can mislead the Seer and the
        Village, complicating their efforts to root out the actual Werewolves.
      </Text>
      <Text className="text-sm text-gray-300 mb-3">
        <Text className="italic">Example:</Text> The Seer checks the Lycan
        during the Night and sees them as a Werewolf. The Village then suspects
        the Lycan, risking the elimination of an innocent player.
      </Text>

      {/* Seer’s Role in Detecting Werewolves */}
      <Text className="text-sm text-gray-300 mb-3">
        <Text className="font-bold">Seer’s Role in Detecting Werewolves:</Text>
        The Seer can inspect one player each Night to determine whether they are
        a Villager or a Werewolf. However, due to roles like the Alpha Werewolf
        and Lycan, the Seer’s readings can be unreliable, requiring strategic
        decision-making when sharing information.
      </Text>
      <Text className="text-sm text-gray-300 mb-3">
        <Text className="italic">Example:</Text> The Seer suspects someone but
        is hesitant to reveal their findings, as doing so could expose their
        role to the Werewolves.
      </Text>

      {/* Werewolves’ Goal of Outnumbering the Village */}
      <Text className="text-sm text-gray-300 mb-3">
        <Text className="font-bold">
          Werewolves’ Goal of Outnumbering the Village:
        </Text>
        The Werewolves win if they equal or outnumber the Villagers. This win
        condition can lead to surprising shifts, especially if multiple
        eliminations happen within a single phase, tipping the game toward the
        Werewolves.
      </Text>
      <Text className="text-sm text-gray-300 mb-3">
        <Text className="italic">Example:</Text> The Werewolves eliminate two
        Villagers in one Night, suddenly creating a 2-to-2 balance, granting the
        Werewolves an unexpected victory.
      </Text>

      {/* Wolf Cub’s Revenge Trigger */}
      <Text className="text-sm text-gray-300 mb-3">
        <Text className="font-bold">Wolf Cub’s Revenge Trigger:</Text>
        If the Wolf Cub is eliminated, the Werewolves are allowed to eliminate
        two players in the following Night phase instead of one. This special
        condition makes eliminating the Wolf Cub risky for the Village, as it
        triggers more aggressive attacks.
      </Text>
      <Text className="text-sm text-gray-300 mb-3">
        <Text className="italic">Example:</Text> The Village eliminates the Wolf
        Cub, but this decision backfires when the Werewolves eliminate two
        Villagers the next Night, severely weakening the Village’s numbers.
      </Text>

      {/* Priest’s Divine Protection */}
      <Text className="text-sm text-gray-300 mb-3">
        <Text className="font-bold">Priest’s Divine Protection:</Text>
        The Priest may receive immunity from the first attack by Werewolves.
        This protection can provide the Village extra time to gain insight and
        discuss strategies, forcing the Werewolves to redirect their attacks.
      </Text>
      <Text className="text-sm text-gray-300 mb-3">
        <Text className="italic">Example:</Text> The Werewolves attack the
        Priest, but he survives, surprising the Village and leading to a new
        round of accusations and deductions.
      </Text>

      {/* Cursed Villager’s Transformation Condition */}
      <Text className="text-sm text-gray-300 mb-3">
        <Text className="font-bold">
          Cursed Villager’s Transformation Condition:
        </Text>
        If targeted by the Werewolves, the Cursed Villager transforms into a
        Werewolf instead of being eliminated. This transformation strengthens
        the Werewolves and turns a previously trusted player into an adversary.
      </Text>
      <Text className="text-sm text-gray-300 mb-3">
        <Text className="italic">Example:</Text> The Cursed Villager is attacked
        by the Werewolves and transforms, shocking the Village and complicating
        their voting strategies.
      </Text>

      {/* Witch’s Kill Potion Overriding Protections */}
      <Text className="text-sm text-gray-300 mb-3">
        <Text className="font-bold">
          Witch’s Kill Potion Overriding Protections:
        </Text>
        If the Witch uses her kill potion on a player, that player dies
        regardless of protection from the Doctor or Bodyguard. This powerful
        ability allows the Witch to ensure the elimination of a critical target,
        even if they were shielded.
      </Text>
      <Text className="text-sm text-gray-300 mb-3">
        <Text className="italic">Example:</Text> The Witch uses her kill potion
        on a protected Werewolf, bypassing the Doctor’s protection and shifting
        the game’s balance in favor of the Village.
      </Text>

      {/* Doctor’s Inability to Save Consecutively */}
      <Text className="text-sm text-gray-300 mb-3">
        <Text className="font-bold">
          Doctor’s Inability to Save Consecutively:
        </Text>
        The Doctor cannot save the same player on consecutive Nights. This rule
        ensures that even powerful roles are vulnerable and can’t rely on
        continuous protection.
      </Text>
      <Text className="text-sm text-gray-300 mb-3">
        <Text className="italic">Example:</Text> The Doctor protects the Seer on
        Night 1, but must choose a different player on Night 2, leaving the Seer
        vulnerable.
      </Text>

      {/* Alpha Werewolf’s Immunity to Seer’s Detection */}
      <Text className="text-sm text-gray-300 mb-3">
        <Text className="font-bold">
          Alpha Werewolf’s Immunity to Seer’s Detection:
        </Text>
        The Alpha Werewolf appears as a Villager when inspected by the Seer.
        This immunity enables the Alpha to avoid early detection, misleading the
        Seer and complicating the Village’s strategy.
      </Text>
      <Text className="text-sm text-gray-300 mb-3">
        <Text className="italic">Example:</Text> The Seer inspects the Alpha
        Werewolf, who appears as a Villager. The Village misplaces their trust,
        allowing the Werewolves more time to build influence.
      </Text>

      {/* Hunter’s Retaliation Upon Elimination */}
      <Text className="text-sm text-gray-300 mb-3">
        <Text className="font-bold">
          Hunter’s Retaliation Upon Elimination:
        </Text>
        If the Hunter is eliminated, they can retaliate by choosing a player to
        eliminate. This powerful response can remove a key player, even after
        the Hunter’s own defeat.
      </Text>
      <Text className="text-sm text-gray-300 mb-3 pb-3">
        <Text className="italic">Example:</Text> The Village votes to eliminate
        the Hunter. Before dying, the Hunter chooses a Werewolf as retaliation,
        altering the course of the game.
      </Text>
    </ScrollView>
  </SafeAreaView>
);

export default SpecialConditions;
