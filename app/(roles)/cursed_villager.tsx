import React from "react";
import RoleTemplate from "../../components/Roles/RolesTemplate";

const CursedVillagerRole = () => {
  return (
    <RoleTemplate
      name="Cursed Villager"
      description="The Cursed Villager is an unfortunate soul who begins the game as a normal villager but harbors a dark secret. If targeted by the Werewolves during the night, the Cursed Villager transforms into a Werewolf, permanently switching allegiance to the Werewolves. Until that moment, they remain loyal to the Village. If the Cursed Villager is discovered by the Seer before transforming, they will appear as a good role, preserving their cover until the curse is triggered."
      roleType="good"
      interactions={[
        "Werewolf - If the Werewolves choose to attack the Cursed Villager, the curse activates, and the Villager permanently joins the Werewolf team, turning from ally to enemy overnight.",
        "Seer - The Seer will see the Cursed Villager as a good role until the curse activates. This can mislead the Village into thinking they are safe, only for the Cursed Villager to later transform.",
        "Witch - If the Witch uses her killing potion on the Cursed Villager before they are attacked by the Werewolves, they die as a normal Villager, without triggering the curse. If the curse is already triggered, the Witch’s potion will kill them as a Werewolf.",
        "Hunter - If the Cursed Villager is killed by the Hunter before transformation, they die as a Villager, sparing the Village from adding another Werewolf to the ranks.",
      ]}
      imagePath={require("../../assets/images/characters/cursed-villager.jpeg")}
    />
  );
};

export default CursedVillagerRole;
