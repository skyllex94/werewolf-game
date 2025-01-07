import React from "react";
import { useTranslation } from "react-i18next";
import RoleTemplate from "../../components/Roles/RolesTemplate";

const TannerRole = () => {
  const { t } = useTranslation();

  return (
    <RoleTemplate
      name={t("roles.tanner.name")}
      description={t("roles.tanner.description")}
      roleType="independent"
      interactions={[
        t("roles.tanner.interactions.villagers"),
        t("roles.tanner.interactions.werewolves"),
        t("roles.tanner.interactions.seer"),
        t("roles.tanner.interactions.hunter"),
        t("roles.tanner.interactions.witch"),
      ]}
      imagePath={require("../../assets/images/characters/lurker3.jpeg")}
    />
  );
};

export default TannerRole;
