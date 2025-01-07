import React from "react";
import RoleTemplate from "../../components/Roles/RolesTemplate";
import { useTranslation } from "react-i18next";

const CupidRole = () => {
  const { t } = useTranslation();

  return (
    <RoleTemplate
      name={t("rolesScreen.cupid.name")}
      description={t("rolesScreen.cupid.description")}
      roleType="good"
      interactions={[
        t("rolesScreen.cupid.interactions.werewolf"),
        t("rolesScreen.cupid.interactions.doctor"),
        t("rolesScreen.cupid.interactions.seer"),
        t("rolesScreen.cupid.interactions.hunter"),
        t("rolesScreen.cupid.interactions.witch"),
        t("rolesScreen.cupid.interactions.priest"),
      ]}
      imagePath={require("../../assets/images/characters/cupid.jpeg")}
    />
  );
};

export default CupidRole;
