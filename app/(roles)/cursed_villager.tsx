import React from "react";
import RoleTemplate from "../../components/Roles/RolesTemplate";
import { useTranslation } from "react-i18next";

const CursedVillagerRole = () => {
  const { t } = useTranslation();

  return (
    <RoleTemplate
      name={t("rolesScreen.cursedVillager.name")}
      description={t("rolesScreen.cursedVillager.description")}
      roleType="good"
      interactions={[
        t("rolesScreen.cursedVillager.interactions.werewolf"),
        t("rolesScreen.cursedVillager.interactions.seer"),
        t("rolesScreen.cursedVillager.interactions.witch"),
        t("rolesScreen.cursedVillager.interactions.hunter"),
      ]}
      imagePath={require("../../assets/images/characters/cursed-villager.jpeg")}
    />
  );
};

export default CursedVillagerRole;
