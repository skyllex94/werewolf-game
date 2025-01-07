import React from "react";
import { useTranslation } from "react-i18next";
import RoleTemplate from "../../components/Roles/RolesTemplate";

const WerewolfRole = () => {
  const { t } = useTranslation();

  return (
    <RoleTemplate
      name={t("roles.werewolf.name")}
      description={t("roles.werewolf.description")}
      roleType="bad"
      interactions={[
        t("roles.werewolf.interactions.otherWerewolves"),
        t("roles.werewolf.interactions.seer"),
        t("roles.werewolf.interactions.doctor"),
        t("roles.werewolf.interactions.tanner"),
        t("roles.werewolf.interactions.witch"),
        t("roles.werewolf.interactions.alphaWerewolf"),
        t("roles.werewolf.interactions.wolfCub"),
      ]}
      imagePath={require("../../assets/images/characters/werewolf.jpeg")}
    />
  );
};

export default WerewolfRole;
