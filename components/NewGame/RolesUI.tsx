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

interface RolesUIProps {
  isFirstNight: boolean;
  soundEnabled: boolean;
}

const RolesUI: React.FC<RolesUIProps> = ({ isFirstNight, soundEnabled }) => {
  const { allPlayersInGame, markRoleAsReady } = useContext(NewGameContext);

  // Mapping roles to their corresponding UI component
  const roleComponents: { [key: string]: any } = {
    Werewolf: WakeWerewolfUI,
    Seer: WakeSeerUI,
    Doctor: WakeDoctorUI,
    Witch: WakeWitchUI,
    "Alpha Werewolf": AlphaWerewolfUI,
    // First night only roles
    Bodyguard: isFirstNight ? WakeBodyguardUI : null,
    Priest: isFirstNight ? WakePriestUI : null,
    Cupid: isFirstNight ? CupidUI : null,
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
