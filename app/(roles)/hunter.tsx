import React from "react";
import { useTranslation } from "react-i18next";
import RoleTemplate from "../../components/Roles/RolesTemplate";

const HunterRole = () => {
  const { t } = useTranslation();

  return (
    <RoleTemplate
      name={t("rolesScreen.hunter.name")}
      description={t("rolesScreen.hunter.description")}
      roleType="good"
      interactions={[
        t("rolesScreen.hunter.interactions.werewolf"),
        t("rolesScreen.hunter.interactions.doctor"),
        t("rolesScreen.hunter.interactions.priest"),
        t("rolesScreen.hunter.interactions.bodyguard"),
        t("rolesScreen.hunter.interactions.witch"),
        t("rolesScreen.hunter.interactions.cupid"),
      ]}
      imagePath={require("../../assets/images/characters/hunter.jpg")}
    />
  );
};

export default HunterRole;
