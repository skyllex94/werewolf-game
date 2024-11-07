import React from "react";
import RoleTemplate from "../../components/Roles/RolesTemplate";

const TannerRole = () => {
  return (
    <RoleTemplate
      name="Tanner"
      description="The Tanner is an unusual character with a unique and counterintuitive goal: they win the game if they are eliminated by the Villagers during the day. Unlike other players who aim to survive, the Tanner actively tries to provoke suspicion and get themselves eliminated. If they succeed, they become the sole winner of the game, regardless of which other roles remain. However, if the Tanner is eliminated during the night (for example, by the Werewolves), they do not win and are simply removed from play. This role requires strategic misdirection and careful manipulation to achieve the desired outcome without revealing their intentions too overtly."
      roleType="independent"
      interactions={[
        "Villagers - If the Villagers vote to eliminate the Tanner during the day, the Tanner immediately wins the game and all other players lose. This is the Tanner's primary goal, so they may attempt to appear suspicious during the day.",
        "Werewolves - If the Werewolves target the Tanner during their nighttime attack, the Tanner is eliminated but does not win. The Werewolves should be cautious in their selection, as a night elimination of the Tanner does not fulfill the Tanner’s win condition.",
        "Seer - The Seer may uncover the identity of the Tanner, so they should be strategic about this role and achieving their agenda without being noticed.",
        "Hunter - If the Hunter kills the Tanner (either intentionally or as retaliation), the Tanner does not win, as their victory condition is specific to daytime elimination by Village vote.",
        "Witch - If the Witch uses their killing potion on the Tanner, the Tanner will be eliminated but will not achieve victory, as the elimination did not occur through the Village's day vote.",
      ]}
      imagePath={require("../../assets/images/characters/lurker3.jpeg")}
    />
  );
};

export default TannerRole;
