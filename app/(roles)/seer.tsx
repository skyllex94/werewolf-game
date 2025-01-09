import React from "react";
import { useTranslation } from "react-i18next";
import RoleTemplate from "../../components/Roles/RolesTemplate";

const SeerRole = () => {
  const { t } = useTranslation();

  return (
    <RoleTemplate
      name={t("rolesScreen.seer.name")}
      description={t("rolesScreen.seer.description")}
      roleType="good"
      interactions={[
        t("rolesScreen.seer.interactions.villager"),
        t("rolesScreen.seer.interactions.werewolf"),
        t("rolesScreen.seer.interactions.tanner"),
        t("rolesScreen.seer.interactions.doctor"),
        t("rolesScreen.seer.interactions.witch"),
        t("rolesScreen.seer.interactions.lycan"),
        t("rolesScreen.seer.interactions.alphaWerewolf"),
      ]}
      imagePath={require("../../assets/images/characters/seer.jpeg")}
    />
  );
};

export default SeerRole;
