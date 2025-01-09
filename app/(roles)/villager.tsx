import React from "react";
import { useTranslation } from "react-i18next";
import RoleTemplate from "../../components/Roles/RolesTemplate";

const VillagerRole = () => {
  const { t } = useTranslation();

  return (
    <RoleTemplate
      name={t("rolesScreen.villager.name")}
      description={t("rolesScreen.villager.description")}
      roleType="good"
      interactions={[
        t("rolesScreen.villager.interactions.werewolf"),
        t("rolesScreen.villager.interactions.seer"),
        t("rolesScreen.villager.interactions.witch"),
      ]}
      imagePath={require("../../assets/images/characters/villager.jpeg")}
    />
  );
};

export default VillagerRole;
