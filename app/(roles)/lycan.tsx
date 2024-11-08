import React from "react";
import RoleTemplate from "../../components/Roles/RolesTemplate";

const LycanRole = () => {
  return (
    <RoleTemplate
      name="Lycan"
      description="The Lycan is a villager, fully aligned with the Village’s goals, yet cursed with a trait that causes them to appear as a Werewolf when viewed by the Seer. This false identity creates complex challenges, as the Seer may mistakenly identify them as a threat, casting suspicion and potentially influencing the Village’s actions against them. The Lycan must be cautious to avoid suspicion while subtly convincing others of their true allegiance to the Village. Despite their appearance in the Seer's eyes, the Lycan is still a good role, aiming to help protect the Village and defeat the Werewolves. Navigating this balance requires the Lycan to play a careful, strategic game to avoid unnecessary elimination and support the villagers in victory."
      roleType="good"
      interactions={[
        "Seer - If the Seer views the Lycan, they will perceive the Lycan as a bad role due to their curse. This misidentification may lead to suspicion from the Seer and the Village, so the Lycan should carefully navigate interactions with the Seer and consider strategies to prove their loyalty over time.",
        "Werewolf - The Werewolves do not know the Lycan’s identity, and the Lycan appears as a regular villager to them. The Lycan’s role in the Village remains unchanged, so they must help protect the Village while also dispelling doubts about their true nature.",
      ]}
      imagePath={require("../../assets/images/characters/lycan.jpeg")}
    />
  );
};

export default LycanRole;
