import React from "react";
import { useTranslation } from "react-i18next";
import RoleTemplate from "../../components/Roles/RolesTemplate";

const VillagerRole = () => {
  const { t } = useTranslation();

  return (
    <RoleTemplate
      name={t("roles.villager.name")}
      description={t("roles.villager.description")}
      roleType="good"
      interactions={[
        t("roles.villager.interactions.werewolf"),
        t("roles.villager.interactions.seer"),
        t("roles.villager.interactions.witch"),
      ]}
      imagePath={require("../../assets/images/characters/villager.jpeg")}
    />
  );
};

export default VillagerRole;
