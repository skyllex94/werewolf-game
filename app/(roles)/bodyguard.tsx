import React from "react";
import RoleTemplate from "../../components/Roles/RolesTemplate";
import { useTranslation } from "react-i18next";

const BodyguardRole = () => {
  const { t } = useTranslation();

  return (
    <RoleTemplate
      name={t("rolesScreen.bodyguard.name")}
      description={t("rolesScreen.bodyguard.description")}
      roleType="good"
      interactions={[
        t("rolesScreen.bodyguard.interactions.werewolf"),
        t("rolesScreen.bodyguard.interactions.hunter"),
        t("rolesScreen.bodyguard.interactions.doctor"),
        t("rolesScreen.bodyguard.interactions.witch"),
        t("rolesScreen.bodyguard.interactions.priest"),
      ]}
      imagePath={require("../../assets/images/characters/bodyguard.jpeg")}
    />
  );
};

export default BodyguardRole;
