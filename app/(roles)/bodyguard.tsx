import React from "react";
import RoleTemplate from "../../components/Roles/RolesTemplate";

const BodyguardRole = () => {
  return (
    <RoleTemplate
      name="Bodyguard"
      description="The Bodyguard is a steadfast protector who selects one player on the first night to shield for the rest of the game. The Bodyguard cannot choose to protect himself. This chosen player gains special protection from attacks, with the Bodyguard stepping in to save them if they are targeted. However, if the protected player is attacked a second time, the Bodyguard will sacrifice himself, dying in their place. This protection is only active as long as the Bodyguard remains in the game. The Bodyguard’s protection is a vital asset, but it is limited—certain powerful roles, such as the Hunter or the Witch, can bypass this safeguard with their lethal abilities."
      roleType="good"
      interactions={[
        "Werewolf - If the Werewolves target the Bodyguard’s protected player, the Bodyguard will prevent the first attack. However, if the Werewolves target this player again, the Bodyguard dies in their place, and the protection ends.",
        "Hunter - If the protected player is chosen by the Hunter's death revenge ability, the Bodyguard cannot prevent the attack, and the protected player will die.",
        "Doctor - The Bodyguard and Doctor’s protections do not conflict, meaning if the Doctor protects the same player on the same night, both protections are active. If the Werewolves target this player, both protections will work, but the priority protection is the Doctor's, so this way the Bodyguard does not use his protection or die.",
        "Witch - If the Witch uses her killing potion on the protected player, the Bodyguard’s protection is ineffective, and the targeted player will die.",
        "Priest - If the Priest blesses the protected player, this blessing adds another layer of defense, though the Bodyguard’s protection remains primary until he is killed in the line of duty.",
      ]}
      imagePath={require("../../assets/images/characters/bodyguard.jpeg")}
    />
  );
};

export default BodyguardRole;
