import React from "react";
import { useTranslation } from "react-i18next";
import RoleTemplate from "../../components/Roles/RolesTemplate";

const SeerRole = () => {
  const { t } = useTranslation();

  return (
    <RoleTemplate
      name={t("roles.seer.name")}
      description={t("roles.seer.description")}
      roleType="good"
      interactions={[
        t("roles.seer.interactions.villager"),
        t("roles.seer.interactions.werewolf"),
        t("roles.seer.interactions.tanner"),
        t("roles.seer.interactions.doctor"),
        t("roles.seer.interactions.witch"),
        t("roles.seer.interactions.lycan"),
        t("roles.seer.interactions.alphaWerewolf"),
      ]}
      imagePath={require("../../assets/images/characters/seer.jpeg")}
    />
  );
};

export default SeerRole;
