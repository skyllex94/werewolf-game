import React from "react";
import RoleTemplate from "../../components/Roles/RolesTemplate";

const AlphaWerewolfRole = () => {
  return (
    <RoleTemplate
      name="Alpha Werewolf"
      description="The Alpha Werewolf is a powerful leader among the Werewolves with unique abilities that can shift the balance in the game. Unlike regular Werewolves, the Alpha awakens separately and independently chooses one target to attack. He can only choose one target for the game and his ability is to make this target into a Werewolf, who will be waking up with the other Werewolves at night. He can choose to use his power at any night and he will be asked if he wants to use it every night even if he has already used it. The Alpha’s unique awakening doesn't allow the other Werewolves to know who the Alpha is and in a sense, the Werewolves may strike at the Alpha at night. This will cause the Alpha to die adding an extra layer of complexity to the Werewolf’s strategy. If the Alpha Werewolf is eliminated, the Werewolf pack loses a valuable asset, making it essential for the Alpha to remain discreet. While an influential figure, the Alpha’s power also attracts the attention of good roles like the Seer and the Witch, who may see the Alpha as a prime target."
      roleType="bad"
      interactions={[
        "Werewolf - The Alpha Werewolf is part of the Werewolf pack but wakes up independently from the regular Werewolves. While the Werewolves collectively choose a target, the Alpha chooses a person to make into a Werewolf, allowing for flexible strategy and potentially confusing the Village. However, the Alpha should avoid targeting other Werewolves and align with the pack's goals as much as possible.",
        "Seer - The Seer may identify the Alpha Werewolf as a threat due to their powerful role within the Werewolf faction. If the Seer reveals the Alpha’s identity to the Village, the Werewolves lose a crucial advantage.",
        "Doctor - If the Doctor protects a player the Alpha targets, the attack will be blocked for that night. The Alpha may need to anticipate the Doctor’s moves to ensure successful attacks.",
        "Witch - The Witch’s killing potion is powerful enough to eliminate the Alpha Werewolf. Since the Witch is aligned with the Village, she may see the Alpha as a priority target if she suspects their identity, which could disrupt the Werewolves’ strategy.",
        "Bodyguard - If the Alpha targets a player protected by the Bodyguard, the protection remains intact, and the Alpha’s attack fails. The Alpha must strategize around the Bodyguard’s defense to be effective.",
        "Hunter - If the Hunter is killed and selects the Alpha as their retaliation target, the Alpha dies, weakening the Werewolf faction significantly. The Alpha must be wary of exposing their identity to avoid being selected by the Hunter in the event of their death.",
      ]}
      imagePath={require("../../assets/images/characters/alpha-werewolf.jpg")}
    />
  );
};

export default AlphaWerewolfRole;
