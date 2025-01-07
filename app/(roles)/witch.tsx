import React from "react";
import { useTranslation } from "react-i18next";
import RoleTemplate from "../../components/Roles/RolesTemplate";

const WitchRole = () => {
  const { t } = useTranslation();

  return (
    <RoleTemplate
      name={t("roles.witch.name")}
      description={t("roles.witch.description")}
      roleType="good"
      interactions={[
        t("roles.witch.interactions.werewolf"),
        t("roles.witch.interactions.doctor"),
        t("roles.witch.interactions.seer"),
        t("roles.witch.interactions.bodyguard"),
        t("roles.witch.interactions.hunter"),
        t("roles.witch.interactions.priest"),
      ]}
      imagePath={require("../../assets/images/characters/witch.jpeg")}
    />
  );
};

export default WitchRole;
