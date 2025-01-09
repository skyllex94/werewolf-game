import React from "react";
import { useTranslation } from "react-i18next";
import RoleTemplate from "../../components/Roles/RolesTemplate";

const PriestRole = () => {
  const { t } = useTranslation();

  return (
    <RoleTemplate
      name={t("rolesScreen.priest.name")}
      description={t("rolesScreen.priest.description")}
      roleType="good"
      interactions={[
        t("rolesScreen.priest.interactions.werewolf"),
        t("rolesScreen.priest.interactions.doctor"),
        t("rolesScreen.priest.interactions.seer"),
        t("rolesScreen.priest.interactions.hunter"),
        t("rolesScreen.priest.interactions.witch"),
        t("rolesScreen.priest.interactions.bodyguard"),
      ]}
      imagePath={require("../../assets/images/characters/priest.jpg")}
    />
  );
};

export default PriestRole;
