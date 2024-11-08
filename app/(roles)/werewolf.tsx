import React from "react";
import RoleTemplate from "../../components/Roles/RolesTemplate";

const WerewolfRole = () => {
  return (
    <RoleTemplate
      name="Werewolf"
      description="The Werewolf deceive the Village during the day pretending to be innocent villagers. At night time they show their true colors and collectively choose player to eliminate. Their goal is to eliminate all the good roles without being uncovered for their identity."
      roleType="bad"
      interactions={[
        "Other Werewolves - Collaborates with fellow Werewolves to plan nightly attacks.",
        "Seer - Must avoid detection by the Seer, who can reveal their identity.",
        "Doctor - Must strategize around the Doctor's protection abilities to ensure successful attacks.",
        "Tanner - The Werewolf benefits from Tanner’s death. Since if the Tanner gets eliminated during the day, he will win the game and not the Werewolves.",
        "Witch - The Witch is on the side of the Village, but could be maneuvered and mislead so this way it doesn't attack the Werewolves with her killing potion.",
        "Alpha Werewolf - The Alpha Werewolf is woken up separately from the Werewolves. Investigate to see if you can find out who the Alpha is so you don't kill him at night, because he plays with you as well, just not woken up at the same time.",
        "Wolf Cub - The Cub wakes up with the Werewolves, but they don't know he is the Cub. You can intentially target to influence the Village during the day to kill him if you know you will need an extra kill the next night in order to win the game.",
      ]}
      imagePath={require("../../assets/images/characters/werewolf.jpeg")}
    />
  );
};

export default WerewolfRole;
