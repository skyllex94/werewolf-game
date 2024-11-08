import React from "react";
import RoleTemplate from "../../components/Roles/RolesTemplate";

const DoctorRole = () => {
  return (
    <RoleTemplate
      name="Doctor"
      description="The Doctor is a critical role in protecting the Village from nightly attacks. Each night, the Doctor selects one player to shield from harm, potentially preventing a Werewolf attack or other fatal outcome. This makes the Doctor a valuable asset to the Village's defense, as their protection can help keep key players safe and prolong the fight against the Werewolves. However, the Doctor's ability comes with a risk; if the Doctor is eliminated, their protective influence vanishes entirely. Losing the Doctor puts the Village at greater risk, making it essential to protect this role as long as possible. The Doctor must balance caution and courage, working discreetly to avoid detection by the Werewolves while ensuring the Village’s survival. The Doctor can use his protection on one player and cannot repeat a player for the next round. He can go back to protecting the same player after a night has passed again. The Doctor can use his protection on himself as well."
      roleType="good"
      interactions={[
        "Werewolf - The Doctor must avoid detection by the Werewolves, as they are likely to target the Doctor to remove his protective influence.",
        "Seer - Works indirectly with the Seer if able to identify, as both play vital roles in safeguarding the Village. It is very good to protect the Seer if she/he uncovers their role to the other people so this way they get protected through the next night.",
        "Hunter - If the Hunter is killed and they target a player who is protected by the Doctor, although they have a protection from him, they will still die.",
        "Witch - If a killing potion is used to kill a player who is protected by the Doctor, the protection is inactive and this player will die even though he is protected by the Doctor.",
        "Bodyguard - If the Werewolves target a player that is already protected by a Doctor and a Bodyguard, the Bodyguard's shield will stay protected, since they will be protected by the Doctor as a priority protection.",
        "Priest - If the Werewolves target a player that is already blessed by the Priest and protected by the Doctor, The Priest's blessing will be intact, since they will be protected by the Doctor as a priority protection.",
        "Cupid - If the Doctor protects one of the bonded players and the Werewolves attempt to kill them, the protection will prevent both players from dying that night.",
      ]}
      imagePath={require("../../assets/images/characters/doctor.jpg")}
    />
  );
};

export default DoctorRole;
