import React from "react";
import RoleTemplate from "../../components/Roles/RolesTemplate";
import { useTranslation } from "react-i18next";

const AlphaWerewolfRole = () => {
  const { t } = useTranslation();

  return (
    <RoleTemplate
      name={t("rolesScreen.alphaWerewolf.name")}
      description={t("rolesScreen.alphaWerewolf.description")}
      roleType="bad"
      interactions={[
        t("rolesScreen.alphaWerewolf.interactions.werewolf"),
        t("rolesScreen.alphaWerewolf.interactions.seer"),
        t("rolesScreen.alphaWerewolf.interactions.doctor"),
        t("rolesScreen.alphaWerewolf.interactions.witch"),
        t("rolesScreen.alphaWerewolf.interactions.bodyguard"),
        t("rolesScreen.alphaWerewolf.interactions.hunter"),
      ]}
      imagePath={require("../../assets/images/characters/alpha-werewolf.jpg")}
    />
  );
};

export default AlphaWerewolfRole;
