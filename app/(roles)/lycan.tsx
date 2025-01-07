import React from "react";
import { useTranslation } from "react-i18next";
import RoleTemplate from "../../components/Roles/RolesTemplate";

const LycanRole = () => {
  const { t } = useTranslation();

  return (
    <RoleTemplate
      name={t("roles.lycan.name")}
      description={t("roles.lycan.description")}
      roleType="good"
      interactions={[
        t("roles.lycan.interactions.seer"),
        t("roles.lycan.interactions.werewolf"),
      ]}
      imagePath={require("../../assets/images/characters/lycan.jpeg")}
    />
  );
};

export default LycanRole;
