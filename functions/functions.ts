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
