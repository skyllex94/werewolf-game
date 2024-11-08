import React from "react";
import RoleTemplate from "../../components/Roles/RolesTemplate";

const WitchRole = () => {
  return (
    <RoleTemplate
      name="Witch"
      description="The Witch is a mysterious and powerful ally of the Village, holding both a healing potion and a killing potion, each available only once per game. During the night, the Witch learns if someone was targeted for elimination and must decide whether to save that person using the healing potion. The Witch also has the option to use the killing potion on any player, allowing her to strike a Werewolf or eliminate a player she suspects to be harmful to the Village. The Witch’s power is formidable, but her limited potion use requires careful timing and strategy. If the Witch is eliminated before using her potions, they are lost to the Village. Balancing her role as protector and potential eliminator, the Witch has a lasting impact on the outcome of the game. She cannot use her potions on herself."
      roleType="good"
      interactions={[
        "Werewolf - The Witch can counter a Werewolf attack by saving the target with her healing potion, thwarting the Werewolves' plans. However, if she uses her killing potion on a Werewolf, it eliminates the threat immediately, though it permanently consumes the potion. If targeted by the Werewolves herself, she risks losing both potions if she hasn't used them yet. She cannot use her potions on herself.",
        "Doctor - The Witch’s healing potion works independently from the Doctor's protection; if the Doctor fails to protect a player, the Witch’s potion can still save them. If both protect the same player, the Witch essentially loses their potion since the person is already protected. They must avoid overlapping their efforts on the same player to maximize the impact of their abilities.",
        "Seer - The Seer may wish to communicate with the Witch to advise on targets for her killing potion, particularly if the Seer identifies a Werewolf. Together, they form a powerful alliance against the Werewolves, though they must exercise caution to avoid revealing themselves too openly.",
        "Bodyguard - The Witch’s killing potion bypasses the Bodyguard’s protection. If the Bodyguard is defending a player and the Witch uses her killing potion on that player, the Bodyguard cannot prevent their death.",
        "Hunter - If the Witch kills the Hunter with her killing potion, the Hunter still has a chance to retaliate and take down another player with them. The Witch must use her potion strategically to avoid this potential backlash. Also if the Hunter attacks a player that the Witch used a saving potion on - the player will still die. The Hunter's death penalty is stronger.",
        "Priest - If the Priest blesses a player, the Witch’s healing potion can still save them if the Werewolves or another attack threatens them. However, her killing potion is strong enough to bypass the Priest’s blessing, causing the player’s death regardless of the blessing.",
      ]}
      imagePath={require("../../assets/images/characters/witch.jpeg")}
    />
  );
};

export default WitchRole;
