import React from "react";
import { useTranslation } from "react-i18next";
import RoleTemplate from "../../components/Roles/RolesTemplate";

const WolfCubRole = () => {
  const { t } = useTranslation();

  return (
    <RoleTemplate
      name={t("roles.wolfCub.name")}
      description={t("roles.wolfCub.description")}
      roleType="bad"
      interactions={[
        t("roles.wolfCub.interactions.werewolf"),
        t("roles.wolfCub.interactions.seer"),
        t("roles.wolfCub.interactions.doctor"),
        t("roles.wolfCub.interactions.witch"),
        t("roles.wolfCub.interactions.hunter"),
        t("roles.wolfCub.interactions.bodyguard"),
      ]}
      imagePath={require("../../assets/images/characters/wolf-cub.jpeg")}
    />
  );
};

export default WolfCubRole;
