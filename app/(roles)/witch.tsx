import React from "react";
import { useTranslation } from "react-i18next";
import RoleTemplate from "../../components/Roles/RolesTemplate";

const WitchRole = () => {
  const { t } = useTranslation();

  return (
    <RoleTemplate
      name={t("rolesScreen.witch.name")}
      description={t("rolesScreen.witch.description")}
      roleType="good"
      interactions={[
        t("rolesScreen.witch.interactions.werewolf"),
        t("rolesScreen.witch.interactions.doctor"),
        t("rolesScreen.witch.interactions.seer"),
        t("rolesScreen.witch.interactions.bodyguard"),
        t("rolesScreen.witch.interactions.hunter"),
        t("rolesScreen.witch.interactions.priest"),
      ]}
      imagePath={require("../../assets/images/characters/witch.jpeg")}
    />
  );
};

export default WitchRole;
