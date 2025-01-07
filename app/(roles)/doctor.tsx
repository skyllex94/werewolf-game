import React from "react";
import RoleTemplate from "../../components/Roles/RolesTemplate";
import { useTranslation } from "react-i18next";

const DoctorRole = () => {
  const { t } = useTranslation();

  return (
    <RoleTemplate
      name={t("rolesScreen.doctor.name")}
      description={t("rolesScreen.doctor.description")}
      roleType="good"
      interactions={[
        t("rolesScreen.doctor.interactions.werewolf"),
        t("rolesScreen.doctor.interactions.seer"),
        t("rolesScreen.doctor.interactions.hunter"),
        t("rolesScreen.doctor.interactions.witch"),
        t("rolesScreen.doctor.interactions.bodyguard"),
        t("rolesScreen.doctor.interactions.priest"),
        t("rolesScreen.doctor.interactions.cupid"),
      ]}
      imagePath={require("../../assets/images/characters/doctor.jpg")}
    />
  );
};

export default DoctorRole;
