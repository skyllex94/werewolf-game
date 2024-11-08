import React from "react";
import RoleTemplate from "../../components/Roles/RolesTemplate";

const VillagerRole = () => {
  return (
    <RoleTemplate
      name="Villager"
      description="The Villager may not have special abilities, but they are essential to the Village and form the main force opposing the Werewolves. During the day, Villagers use their logic, observation, and intuition to identify suspicious behavior, detect lies, and work collaboratively to expose the Werewolves hidden among them. They contribute to the voting process, where they can steer discussions and influence decisions about who to eliminate. While Villagers rely solely on their wits, their ability to carefully observe and interpret the words and actions of others makes them the backbone of the Village’s strategy, uniting them against the forces that threaten their survival."
      roleType="good"
      interactions={[
        "Werewolf - Villagers are the primary target for Werewolves, who seek to reduce their numbers each night. Villagers should pay close attention to players who seem evasive or manipulative, as this could reveal hidden Werewolves.",
        "Seer - Villagers work alongside the Seer and other roles, gathering information and contributing insights to support the Seer’s discoveries. However, they must also protect the Seer’s identity to prevent Werewolf attacks.",
        "Witch - If a Villager is targeted for elimination, the Witch may choose to use her healing potion to save them, preserving the Village's strength. Villagers must identify potential Werewolf allies to guide the Witch’s decision wisely.",
      ]}
      imagePath={require("../../assets/images/characters/villager.jpeg")}
    />
  );
};

export default VillagerRole;
