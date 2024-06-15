import { useIsDarkMode } from "@showtime-xyz/universal.hooks";
import { ShowtimeWordmark } from "@showtime-xyz/universal.icon";
import { useRouter } from "@showtime-xyz/universal.router";
import { colors } from "@showtime-xyz/universal.tailwind";
import { Text } from "@showtime-xyz/universal.text";
import { View } from "@showtime-xyz/universal.view";
import { FontAwesome } from '@expo/vector-icons';
import { useFooter } from "app/hooks/use-footer";
import { HIDE_LINK_FOOTER_ROUTER_LIST } from "app/lib/constants";
import { Link } from "app/navigation/link";

export const WebFooter = () => {
  const isDark = useIsDarkMode();
  const router = useRouter();
  if (HIDE_LINK_FOOTER_ROUTER_LIST.includes(router.pathname)) {
    return null;
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', marginVertical: '12px' }}>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 0 }}>
        <Text style={{ fontSize: 13 }} tw="text-base font-bold text-gray-500 dark:text-white">
          Crafted with
          <Text tw="mx-1 text-pink-500 dark:text-pink-400">{"\u2764"}</Text>
          in India
        </Text>
      </View>
    </View>
  );
};
