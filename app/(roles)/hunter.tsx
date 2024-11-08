import React from "react";
import RoleTemplate from "../../components/Roles/RolesTemplate";

const HunterRole = () => {
  return (
    <RoleTemplate
      name="Hunter"
      description="The Hunter is a fearless role within the Village, known for their last stand ability. If the Hunter is eliminated during the game, they get one final chance to take down another player of their choosing before they leave the game. This powerful ability gives the Hunter a significant impact even in death, and makes them a high-stakes target for the Werewolves and other bad roles. The Hunter must carefully observe and decide who might be most valuable to take with them if they are eliminated, potentially turning the tide of the game. However, certain protections, such as the Priest’s blessing or Doctor’s shield, can affect their final shot, making it essential for the Hunter to strategize based on the current game dynamics."
      roleType="good"
      interactions={[
        "Werewolf - If the Hunter is targeted and eliminated by the Werewolves, they will get one last chance to retaliate by choosing a player to eliminate with them. This final attack is unaffected by the Werewolves’ influence and cannot be prevented by their strategies.",
        "Doctor - If the Hunter targets a player protected by the Doctor in their final shot, the protection is ineffective, and the targeted player will still die as the Hunter’s attack overrides the Doctor’s shield.",
        "Priest - If the Hunter targets a blessed player, the Priest’s blessing will not protect them. The Hunter’s final attack is powerful and cannot be mitigated by the blessing.",
        "Bodyguard - If the Hunter targets a player protected by the Bodyguard, the protection will be bypassed, meaning the target will still die regardless of the Bodyguard’s protection.",
        "Witch - If the Hunter is killed and the Witch uses her saving potion on the Hunter, they can prevent the Hunter’s death and thereby their final shot. However, if the Witch does not use the potion, the Hunter will proceed with their last attack.",
        "Cupid - If the Hunter is one of Cupid’s bonded lovers, and they die, the other bonded lover will die of heartbreak. In addition to this, the Hunter will decide on another player to kill. The Hunter decision will happen before revealing the Cupid's bond.",
      ]}
      imagePath={require("../../assets/images/characters/hunter.jpg")}
    />
  );
};

export default HunterRole;
