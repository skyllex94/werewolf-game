import React from "react";
import { useTranslation } from "react-i18next";
import RoleTemplate from "../../components/Roles/RolesTemplate";

const WerewolfRole = () => {
  const { t } = useTranslation();

  return (
    <RoleTemplate
      name={t("rolesScreen.werewolf.name")}
      description={t("rolesScreen.werewolf.description")}
      roleType="bad"
      interactions={[
        t("rolesScreen.werewolf.interactions.otherWerewolves"),
        t("rolesScreen.werewolf.interactions.seer"),
        t("rolesScreen.werewolf.interactions.doctor"),
        t("rolesScreen.werewolf.interactions.tanner"),
        t("rolesScreen.werewolf.interactions.witch"),
        t("rolesScreen.werewolf.interactions.alphaWerewolf"),
        t("rolesScreen.werewolf.interactions.wolfCub"),
      ]}
      imagePath={require("../../assets/images/characters/werewolf.jpeg")}
    />
  );
};

export default WerewolfRole;
