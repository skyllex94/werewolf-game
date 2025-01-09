import React from "react";
import { useTranslation } from "react-i18next";
import RoleTemplate from "../../components/Roles/RolesTemplate";

const WolfCubRole = () => {
  const { t } = useTranslation();

  return (
    <RoleTemplate
      name={t("rolesScreen.wolfCub.name")}
      description={t("rolesScreen.wolfCub.description")}
      roleType="bad"
      interactions={[
        t("rolesScreen.wolfCub.interactions.werewolf"),
        t("rolesScreen.wolfCub.interactions.seer"),
        t("rolesScreen.wolfCub.interactions.doctor"),
        t("rolesScreen.wolfCub.interactions.witch"),
        t("rolesScreen.wolfCub.interactions.hunter"),
        t("rolesScreen.wolfCub.interactions.bodyguard"),
      ]}
      imagePath={require("../../assets/images/characters/wolf-cub.jpeg")}
    />
  );
};

export default WolfCubRole;
