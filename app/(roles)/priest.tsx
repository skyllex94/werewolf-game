import React from "react";
import RoleTemplate from "../../components/Roles/RolesTemplate";

const PriestRole = () => {
  return (
    <RoleTemplate
      name="Priest"
      description="The Priest is a powerful protector in the game, blessed with the ability 
      to shield one player from harm through a divine blessing. The Priest can choose to bless one player for the game, making them immune to Werewolf attacks. This blessing remains effective only as long as the Priest is alive; if the Priest is killed, all blessings are lost, and previously blessed players become vulnerable once more. However, the blessing does not protect against certain powerful attacks, making the Priest's choices critical to the survival of key players in the Village."
      roleType="good"
      interactions={[
        "Werewolf - The Priest’s blessing protects a player from Werewolf attacks for the night. However, the Werewolves can still strategize around the Priest’s blessing to target other villagers or even plan an attack on the Priest to eliminate their protective power.",
        "Doctor - The Doctor’s protection is independent of the Priest’s blessing. If a player is both blessed by the Priest and protected by the Doctor, they have multiple layers of defense. However, if the Priest is eliminated, the blessing is lost, leaving the Doctor’s protection as the sole shield.",
        "Seer - While the Seer uncovers information, the Priest can use their blessing to protect the Seer if their identity is revealed, safeguarding them from attacks.",
        "Hunter - If the Hunter is eliminated and targets a blessed player, the Priest’s blessing does not prevent the Hunter’s final attack, and the blessed player will still die.",
        "Witch - If the Witch uses her killing potion on a blessed player, the Priest’s blessing will not prevent this death. The blessing does not extend to attacks from supernatural sources, like the Witch’s potion.",
        "Bodyguard - The Bodyguard and Priest can both protect a player, though in different ways. If the Bodyguard is actively protecting a player blessed by the Priest, the blessing will remain, but the Bodyguard’s protection is prioritized for physical attacks.",
      ]}
      imagePath={require("../../assets/images/characters/priest.jpg")}
    />
  );
};

export default PriestRole;
