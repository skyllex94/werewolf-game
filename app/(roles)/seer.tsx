import React from "react";
import RoleTemplate from "../../components/Roles/RolesTemplate";

const SeerRole = () => {
  return (
    <RoleTemplate
      name="Seer"
      description="The Seer has the special ability to reveal the identity of one player each night. Their goal is to uncover the Werewolves and help guide the Village towards victory by identifying dangerous roles. You will be notified about the role of the player you choose to see with a thumbs up (good role), thumbs down (bad role) of flat hand (Tanner)."
      roleType="good"
      interactions={[
        "Villager - Works closely with Villagers to identify Werewolves and dangerous roles.",
        "Werewolf - Seeks to identify Werewolves to alert the Village of the threat.",
        "Tanner - If you encounter a Tanner, make sure to effectively communicate this to your fellow Villager, so they don't kil him and loose the game.",
        "Doctor - May rely on the Doctor's protection if their identity becomes suspected by the Werewolves.",
        "Witch - Could collaborate with the Witch for additional insight or protection if both identify as good roles.",
        "Lycan - This role will be distinguished by the Seer as a bad role, but they are a Villager. Make sure to pay attention if there is a Lycan in the game.",
        "Alpha Werewolf - The Seer’s greatest challenge is to identify the Alpha Werewolf. The Alpha will be distingushed as bad role, the same as a regular Werewolf.",
      ]}
      imagePath={require("../../assets/images/characters/seer.jpeg")}
    />
  );
};

export default SeerRole;
