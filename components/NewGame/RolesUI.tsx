import React, { useContext } from "react";
import { View } from "react-native";
import {
  WakeWerewolfUI,
  WakeSeerUI,
  WakeDoctorUI,
  WakeBodyguardUI,
  WakePriestUI,
  WakeWitchUI,
  AlphaWerewolfUI,
  CupidUI,
} from "../../components/NewGame/NightRolesUI";
import NewGameContext from "@/contexts/NewGameContext";
import { ScrollView } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";

interface RolesUIProps {
  isFirstNight: boolean;
  soundEnabled: boolean;
}

const RolesUI: React.FC<RolesUIProps> = ({ isFirstNight, soundEnabled }) => {
  const { allPlayersInGame } = useContext(NewGameContext);

  const { t } = useTranslation();

  const roles = {
    Villager: t("newGameScreen.roles.villager"),
    Werewolf: t("newGameScreen.roles.werewolf"),
    Seer: t("newGameScreen.roles.seer"),
    Doctor: t("newGameScreen.roles.doctor"),
    Bodyguard: t("newGameScreen.roles.bodyguard"),
    Hunter: t("newGameScreen.roles.hunter"),
    Priest: t("newGameScreen.roles.priest"),
    Prince: t("newGameScreen.roles.prince"),
    Witch: t("newGameScreen.roles.witch"),
    Tanner: t("newGameScreen.roles.tanner"),
    AlphaWerewolf: t("newGameScreen.roles.alphaWerewolf"),
    Lycan: t("newGameScreen.roles.lycan"),
    CursedVillager: t("newGameScreen.roles.cursedVillager"),
    Cupid: t("newGameScreen.roles.cupid"),
    WolfCub: t("newGameScreen.roles.wolfCub"),
  };

  // Mapping roles to their corresponding UI component
  const roleComponents: { [key: string]: any } = {
    [roles.Werewolf]: WakeWerewolfUI,
    [roles.Seer]: WakeSeerUI,
    [roles.Doctor]: WakeDoctorUI,
    [roles.Witch]: WakeWitchUI,
    [roles.AlphaWerewolf]: AlphaWerewolfUI,
    // First night only roles
    [roles.Bodyguard]: isFirstNight ? WakeBodyguardUI : null,
    [roles.Priest]: isFirstNight ? WakePriestUI : null,
    [roles.Cupid]: isFirstNight ? CupidUI : null,
  };

  // Get unique roles, ensuring Werewolf is first and Witch is last if present
  const uniqueRoles = Array.from(
    new Set(allPlayersInGame.map((player: { role: string }) => player.role))
  ).sort((a, b) => {
    if (a === "Werewolf") return -1;
    if (b === "Werewolf") return 1;
    if (a === "Witch") return 1;
    if (b === "Witch") return -1;
    return 0;
  });

  return (
    <ScrollView showsVerticalScrollIndicator={false} className="mb-20">
      <View className="mt-4 px-4">
        {uniqueRoles.map((role: any) => {
          const RoleUI = roleComponents[role];
          return RoleUI ? (
            <RoleUI key={role} soundEnabled={soundEnabled} />
          ) : null;
        })}
      </View>
    </ScrollView>
  );
};

export default RolesUI;
