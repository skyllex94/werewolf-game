import React from "react";
import { useTranslation } from "react-i18next";
import RoleTemplate from "../../components/Roles/RolesTemplate";

const TannerRole = () => {
  const { t } = useTranslation();

  return (
    <RoleTemplate
      name={t("rolesScreen.tanner.name")}
      description={t("rolesScreen.tanner.description")}
      roleType="independent"
      interactions={[
        t("rolesScreen.tanner.interactions.villagers"),
        t("rolesScreen.tanner.interactions.werewolves"),
        t("rolesScreen.tanner.interactions.seer"),
        t("rolesScreen.tanner.interactions.hunter"),
        t("rolesScreen.tanner.interactions.witch"),
      ]}
      imagePath={require("../../assets/images/characters/lurker3.jpeg")}
    />
  );
};

export default TannerRole;
