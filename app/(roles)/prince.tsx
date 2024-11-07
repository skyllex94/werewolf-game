import React from "react";
import RoleTemplate from "../../components/Roles/RolesTemplate";

const PrinceRole = () => {
  return (
    <RoleTemplate
      name="Prince"
      description="The Prince is a unique role that carries a special form of protection during the day. Regardless of how many times the Village attempts to vote the Prince out, he cannot be eliminated by this method. If the Village decides to vote the Prince out during the day, the Narrator simply announces that the attempt is ineffective, reinforcing the Prince’s untouchable status. However, this protection does not extend to the night, where the Prince can be vulnerable to attacks from the Werewolves or other roles. The Prince must use his influence wisely, as he plays a crucial part in leading the Village without fear of daytime elimination."
      roleType="good"
      interactions={[
        "Werewolf - The Prince is vulnerable to attacks by the Werewolves at night, and they may prioritize him due to his immunity from daytime elimination.",
        "Hunter - If the Prince is targeted by the Hunter's death revenge ability, he will die regardless of his daytime protection.",
        "Doctor - If the Doctor chooses to protect the Prince at night, any Werewolf attacks that night will be blocked, allowing the Prince to survive even nighttime dangers.",
        "Witch - If the Witch uses her potion to kill the Prince, he will die, as her ability bypasses his daytime immunity.",
        "Priest - If the Priest blesses the Prince, the blessing will further protect him from attacks, strengthening his resilience as long as the Priest’s protection is active and he is in the game.",
      ]}
      imagePath={require("../../assets/images/characters/prince.jpeg")}
    />
  );
};

export default PrinceRole;
