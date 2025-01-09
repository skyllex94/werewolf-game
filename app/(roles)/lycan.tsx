import React from "react";
import { useTranslation } from "react-i18next";
import RoleTemplate from "../../components/Roles/RolesTemplate";

const LycanRole = () => {
  const { t } = useTranslation();

  return (
    <RoleTemplate
      name={t("rolesScreen.lycan.name")}
      description={t("rolesScreen.lycan.description")}
      roleType="good"
      interactions={[
        t("rolesScreen.lycan.interactions.seer"),
        t("rolesScreen.lycan.interactions.werewolf"),
      ]}
      imagePath={require("../../assets/images/characters/lycan.jpeg")}
    />
  );
};

export default LycanRole;
