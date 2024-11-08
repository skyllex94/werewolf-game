import React from "react";
import RoleTemplate from "../../components/Roles/RolesTemplate";

const WolfCubRole = () => {
  return (
    <RoleTemplate
      name="Wolf Cub"
      description="The Wolf Cub is a younger member of the Werewolf pack, and while it doesn’t have an individual ability to attack or influence others, it plays a pivotal role in strengthening the pack. The Wolf Cub wakes up with the rest of the Wereowolves at night. If the Wolf Cub is killed by the Village or another player, the Werewolf pack will seek revenge, gaining an extra kill on the following night. This makes the Wolf Cub a high-priority target for the Village but also a member the Werewolves are eager to protect. While the Cub lacks the strength of a full Werewolf, its presence is a strategic advantage to the Werewolves as long as it remains alive."
      roleType="bad"
      interactions={[
        "Werewolf - The Wolf Cub is protected by the Werewolves, who seek to keep it alive. If the Wolf Cub is eliminated, the Werewolves receive an extra kill on the next night, intensifying the threat to the Village.",
        "Seer - The Seer may identify the Wolf Cub as a Werewolf and reveal this information to the Village, making it a target. Losing the Cub could accelerate the Werewolves' attacks on the Village.",
        "Doctor - If the Doctor protects the Wolf Cub, they may prevent the Cub’s elimination for a night, preserving the Werewolf faction’s numbers and the possibility of extra kills if the Village later eliminates the Cub.",
        "Witch - If the Witch uses her killing potion on the Wolf Cub, the Werewolves gain their extra kill on the next night. However, if the Witch uses her healing potion on the Wolf Cub when it’s targeted, the Cub survives, and the Village misses the chance to prevent the extra kill effect.",
        "Hunter - If the Hunter dies and selects the Wolf Cub as their retaliation target, the Wolf Cub dies, and the Werewolves receive an extra kill on the following night. The Hunter must weigh this choice carefully if they aim to avoid strengthening the Werewolves.",
        "Bodyguard - If the Bodyguard protects the Wolf Cub and prevents its death, the Werewolves avoid losing the Cub’s beneficial influence. The Village may struggle to eliminate the Cub, especially if it gains multiple protections.",
      ]}
      imagePath={require("../../assets/images/characters/wolf-cub.jpeg")}
    />
  );
};

export default WolfCubRole;
