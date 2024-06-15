import { useRouter } from "@showtime-xyz/universal.router";
import { Text } from "@showtime-xyz/universal.text";
import { View } from "@showtime-xyz/universal.view";

const titleMap = new Map([
  // ["/notifications", "Notifications"],

  // ["/", "Landing"],

  // ["/home", "Home"],
  // ["/search", "Search"],
  // ["/@[username]", "Profile"],
  // ["/groups", "Groups"],

  // ["/space", "My Space"],

  // ["/creator-channels/[channelId]", "Channel"],

  // ["/settings", "Settings"],
]);

export const HeaderTitle = () => {
  const router = useRouter();
  const pathname = router?.pathname;
  const title: any = titleMap.get(pathname) || '';
  if (!title) {
    return null;
  }
  return (
    <View tw="flex-row items-center justify-center">
      <Text tw="text-base font-bold text-black dark:text-white">{title || 'TITLE_NA'}</Text>
    </View>
  );
};
