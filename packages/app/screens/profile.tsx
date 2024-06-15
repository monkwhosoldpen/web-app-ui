import { Platform } from "react-native";

import { withColorScheme } from "app/components/memo-with-theme";
import { Profile } from "app/components/profile";
import { useUser } from "app/hooks/use-user";
import { useTrackPageViewed } from "app/lib/analytics";
import { createParam } from "app/navigation/use-param";

type Query = {
  username: string;
  type: any;
};

const { useParam } = createParam<Query>();

const ProfileScreen = withColorScheme(() => {
  useTrackPageViewed({ name: "Profile" });
  const [username] = useParam("username");
  const cleanedUsername =
    username && username !== "" ? username?.replace(/@/g, "") : null;
  return (
    <>
      <Profile
        username={Platform.select({
          web: cleanedUsername,
          default: cleanedUsername,
        }) as string} />
    </>
  );
});

export { ProfileScreen };
