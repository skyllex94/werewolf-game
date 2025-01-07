import React from "react";
import { useTranslation } from "react-i18next";
import RoleTemplate from "../../components/Roles/RolesTemplate";

const PriestRole = () => {
  const { t } = useTranslation();

  return (
    <RoleTemplate
      name={t("roles.priest.name")}
      description={t("roles.priest.description")}
      roleType="good"
      interactions={[
        t("roles.priest.interactions.werewolf"),
        t("roles.priest.interactions.doctor"),
        t("roles.priest.interactions.seer"),
        t("roles.priest.interactions.hunter"),
        t("roles.priest.interactions.witch"),
        t("roles.priest.interactions.bodyguard"),
      ]}
      imagePath={require("../../assets/images/characters/priest.jpg")}
    />
  );
};

export default PriestRole;
