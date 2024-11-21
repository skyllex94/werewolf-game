import { ScrollViewStyleReset } from "expo-router/html";

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />

        <ScrollViewStyleReset />

        {/* Using raw CSS styles as an escape-hatch to ensure the background color never flickers in dark-mode. */}
        <style dangerouslySetInnerHTML={{ __html: responsiveBackground }} />
        {/* Add any additional <head> elements that you want globally available on web... */}
      </head>
      <body>{children}</body>
    </html>
  );
}

const responsiveBackground = `
body {
  background-color: #fff;
}
@media (prefers-color-scheme: dark) {
  body {
    background-color: #000;
  }
}`;

// Night time continue button enabling
// const [isEnabledContinue, setIsEnabledContinue] = useState<boolean>(false);
// const [uniqueRolesInGame, setUniqueRolesInGame] = useState<{
//   [key: string]: boolean;
// }>({});

// const markRoleAsReady = (role: string, isReady: boolean) => {
//   setUniqueRolesInGame((prevRoles) => ({
//     ...prevRoles,
//     [role]: isReady,
//   }));
// };

// // Enable continue button if all roles are marked as ready
// useEffect(() => {
//   const allReady = Object.values(uniqueRolesInGame).every(
//     (ready) => ready === true
//   );
//   setIsEnabledContinue(allReady);
// }, [uniqueRolesInGame]);
