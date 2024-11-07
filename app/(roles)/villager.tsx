import React from "react";
import RoleTemplate from "../../components/Roles/RolesTemplate";

const VillagerRole = () => {
  return (
    <RoleTemplate
      name="Villager"
      description="The Villager has no special abilities but aims to work with others to 
      identify the Werewolves and protect the Village."
      roleType="good"
      interactions={[
        "All Good Roles - Cooperates with all the other good roles in the game in order to eliminate all of the Werewolves and bad roles in the game.",
        "Hunter - If attacked by the Hunter the Villager will die with him.",
      ]}
      imagePath={require("../../assets/images/characters/villager.jpeg")}
    />
  );
};

export default VillagerRole;
