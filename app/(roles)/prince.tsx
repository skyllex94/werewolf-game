import React from "react";
import { useTranslation } from "react-i18next";
import RoleTemplate from "../../components/Roles/RolesTemplate";

const PrinceRole = () => {
  const { t } = useTranslation();

  return (
    <RoleTemplate
      name={t("roles.prince.name")}
      description={t("roles.prince.description")}
      roleType="good"
      interactions={[
        t("roles.prince.interactions.werewolf"),
        t("roles.prince.interactions.hunter"),
        t("roles.prince.interactions.doctor"),
        t("roles.prince.interactions.witch"),
        t("roles.prince.interactions.priest"),
      ]}
      imagePath={require("../../assets/images/characters/prince.jpeg")}
    />
  );
};

export default PrinceRole;
