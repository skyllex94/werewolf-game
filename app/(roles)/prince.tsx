import React from "react";
import { useTranslation } from "react-i18next";
import RoleTemplate from "../../components/Roles/RolesTemplate";

const PrinceRole = () => {
  const { t } = useTranslation();

  return (
    <RoleTemplate
      name={t("rolesScreen.prince.name")}
      description={t("rolesScreen.prince.description")}
      roleType="good"
      interactions={[
        t("rolesScreen.prince.interactions.werewolf"),
        t("rolesScreen.prince.interactions.hunter"),
        t("rolesScreen.prince.interactions.doctor"),
        t("rolesScreen.prince.interactions.witch"),
        t("rolesScreen.prince.interactions.priest"),
      ]}
      imagePath={require("../../assets/images/characters/prince.jpeg")}
    />
  );
};

export default PrinceRole;
