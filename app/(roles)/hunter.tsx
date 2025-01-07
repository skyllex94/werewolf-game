import React from "react";
import { useTranslation } from "react-i18next";
import RoleTemplate from "../../components/Roles/RolesTemplate";

const HunterRole = () => {
  const { t } = useTranslation();

  return (
    <RoleTemplate
      name={t("roles.hunter.name")}
      description={t("roles.hunter.description")}
      roleType="good"
      interactions={[
        t("roles.hunter.interactions.werewolf"),
        t("roles.hunter.interactions.doctor"),
        t("roles.hunter.interactions.priest"),
        t("roles.hunter.interactions.bodyguard"),
        t("roles.hunter.interactions.witch"),
        t("roles.hunter.interactions.cupid"),
      ]}
      imagePath={require("../../assets/images/characters/hunter.jpg")}
    />
  );
};

export default HunterRole;
