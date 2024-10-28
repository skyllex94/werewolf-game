import { router } from "expo-router";

// Function to shuffle an array
export function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Function to randomly assign roles to players
export function assignRolesToPlayers(
  characters: any[],
  playersNames: string[]
) {
  console.log("characters:", characters, typeof characters);
  console.log("playersNames:", playersNames, typeof characters);

  // Create a pool of character types based on the `amount` for each type
  let characterPool: string[] = [];

  // Define a mapping of roles to links
  const roleLinks: { [key: string]: string } = {
    Villager:
      "https://werewolf-app.netlify.app/126c3cb75cb3fbac5432732b23eef6bd", // Link for Villager role
    Werewolf:
      "https://werewolf-app.netlify.app/bbb3606b5cab898386e0d9590278068e", // Link for Werewolf role
    Seer: "https://werewolf-app.netlify.app/34b81f08e80d23ea2454472421070786", // Link for Seer role
    Doctor: "https://werewolf-app.netlify.app/doctor-role-link", // Add Doctor link
  };

  // Define a mapping of roles to their types (good, bad or independent)
  const roleTypes: { [key: string]: "good" | "bad" | "independent" } = {
    Villager: "good",
    Werewolf: "bad",
    Seer: "good",
    Doctor: "good",
    Tanner: "independent",
    Cupid: "good",
    Prince: "good",
    Bodyguard: "good",
    "Cursed Villager": "bad",
    Priest: "good",
    Hunter: "good",
    Witch: "bad",
    "Alpha Werewolf": "bad",
    "Wolf Cub": "bad",
  };

  // Ensure characters is a valid array
  characters.forEach((character: { type: string; amount: number }) => {
    for (let i = 0; i < character.amount; i++) {
      characterPool.push(character.type);
    }
  });

  // Shuffle the pool to randomize the assignment
  characterPool = shuffleArray(characterPool);

  // Map each player to a character type from the shuffled pool
  const playerRoles = playersNames.map((player: string, idx: number) => {
    const role = characterPool[idx];
    return {
      name: player,
      order: idx + 1,
      role: role,
      link: roleLinks[role] || "https://example.com/no-role",
      type: roleTypes[role] || "good",
    };
  });

  return playerRoles;
}

export function truncate(text: string, maxLength: number = 10) {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + "...";
}

export function checkForWinner(remainingPlayers: any, isDay: boolean) {
  // Count the number of good and bad players remaining
  const goodPlayersCount = remainingPlayers.filter(
    (player: any) => player.type == "good"
  ).length;

  console.log("goodPlayersCount:", goodPlayersCount);

  const badPlayersCount = remainingPlayers.filter(
    (player: any) => player.type == "bad"
  ).length;

  console.log("badPlayersCount:", badPlayersCount);

  // Determine if the game is won
  if (badPlayersCount >= goodPlayersCount) {
    // Bad players win
    router.replace({
      pathname: "/game_winner",
      params: { winner: "bad" },
    });
  } else if (badPlayersCount === 0) {
    // Good players win
    router.replace({
      pathname: "/game_winner",
      params: { winner: "good" },
    });
  } else {
    // Continue the game if no winner yet
    if (isDay) {
      router.push({
        pathname: "/night_time",
        params: { firstNight: "false" },
      });
    } else {
      router.push({
        pathname: "/day_time",
      });
    }
  }
}

// function checkIfBodyguardedPlayerAttacked() {
//   const bodyguard = playersInGame.find(
//     (player: any) => player.role === "Bodyguard"
//   );

//   playersInGame.forEach((selectedPlayer: any) => {
//     if (selectedPlayer.protectedByBodyguard && bodyguard) {
//       selectedPlayer.numberOfAttacks += 1;

//       if (selectedPlayer.numberOfAttacks === 1) {
//         Alert.alert(
//           "Bodyguard Protection",
//           `${selectedPlayer.name} is protected by the Bodyguard and survives the attack.`
//         );
//       } else if (selectedPlayer.numberOfAttacks === 2) {
//         // Eliminate the Bodyguard instead of the protected player
//         Alert.alert(
//           "Bodyguard Sacrifice",
//           `${bodyguard.name} has sacrificed themselves to protect ${selectedPlayer.name} from a second attack.`
//         );

//         // Remove the Bodyguard from playersInGame
//         setPlayersInGame((prev: any) => {
//           const updatedPlayers = prev.filter(
//             (player: any) => player.order !== bodyguard.order
//           );

//           // Log or check if the Bodyguard is removed successfully
//           console.log("Updated BODYYY:", updatedPlayers);
//           console.log(
//             "Is Bodyguard removed:",
//             !updatedPlayers.some(
//               (player: any) => player.role === "Bodyguard"
//             )
//           );

//           return updatedPlayers;
//         });

//         // Remove protection and attack tracking from the protected player
//         selectedPlayer.protectedByBodyguard = false;
//         delete selectedPlayer.numberOfAttacks;
//       }
//     }
//   });
// }

// function checkIfDoctorProtected() {
//   const isDoctorAlive = playersInGame.some(
//     (player: any) => player.role === "Doctor"
//   );

//   selectedPlayersForElimination.forEach((selectedPlayer: any) => {
//     if (selectedPlayer.protectedByDoctor && isDoctorAlive) {
//       // Player protected by Doctor survives
//       Alert.alert(
//         "Doctor's Protection",
//         `${selectedPlayer.name} was attacked but protected by the Doctor and survives.`
//       );
//       // Remove the player from the elimination list
//       setSelectedPlayersForElimination(
//         selectedPlayersForElimination.filter(
//           (p: any) => p.order !== selectedPlayer.order
//         )
//       );
//     }
//   });
// }
