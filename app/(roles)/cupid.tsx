import React from "react";
import RoleTemplate from "../../components/Roles/RolesTemplate";

const CupidRole = () => {
  return (
    <RoleTemplate
      name="Cupid"
      description="Cupid is a role that has the power to create a special bond between two players, linking their fates for the remainder of the game. At the beginning of the game, Cupid selects two players who will become 'bound' as lovers. This connection means that if one of the lovers dies, the other immediately dies of heartbreak. Cupid’s selection is pivotal because the linked players must navigate their new loyalty carefully. This bond can serve as a powerful tool to complicate the game and requires strategic consideration, as it can affect alliances and shift player priorities. Even if the Cupid dies, the bond stays for the rest of the game."
      roleType="good"
      interactions={[
        "Werewolf - If one of Cupid’s bonded players is targeted and killed by the Werewolves, the other lover dies as well, fulfilling the bond’s tragic outcome.",
        "Doctor - If the Doctor protects one of the bonded players and the Werewolves attempt to kill them, the protection will prevent both players from dying that night.",
        "Seer - If the Seer reveals one of the bonded lovers, they are displayed as a good role if they are a good role and a bad role if they are a bad role. Only the player selected by the Seer is told what's his role in the game.",
        "Hunter - If the Hunter dies and selects one of the bonded lovers to die with them, the other lover will also perish as part of the bond’s effect.",
        "Witch - If the Witch uses her potion to kill one of the bonded players, the other will also die due to the connection forged by Cupid. If the Witch uses her safe potion on one of the Players, both of the players will be saved.",
        "Priest - If the Priest blesses one of the lovers, this protection will still hold even if the other lover is targeted by an attack, unless that attack is powerful enough to bypass protection, as in the case of the Witch’s killing potion.",
      ]}
      imagePath={require("../../assets/images/characters/cupid.jpeg")}
    />
  );
};

export default CupidRole;
