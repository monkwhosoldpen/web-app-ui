import { Alert } from "@showtime-xyz/universal.alert";
import { BottomSheetModalProvider } from "@showtime-xyz/universal.bottom-sheet";
import { Button } from "@showtime-xyz/universal.button";
import { Divider } from "@showtime-xyz/universal.divider";
import { useRouter } from "@showtime-xyz/universal.router";
import Spinner from "@showtime-xyz/universal.spinner";
import { Switch } from "@showtime-xyz/universal.switch";
import { Text } from "@showtime-xyz/universal.text";
import { View } from "@showtime-xyz/universal.view";

import { createParam } from "app/navigation/use-param";

import {
  useChannelSettings,
  useEditChannelSettings,
} from "./hooks/use-edit-channel-settings";
import { useLeaveChannel } from "./hooks/use-leave-channel";
import { useTranslation } from "react-i18next";

type Query = {
  channelId: string;
};
const { useParam } = createParam<Query>();

export const ChannelsSettings = () => {
  const [channelId] = useParam("channelId");
  const { data, isLoading } = useChannelSettings(channelId);
  const { trigger } = useEditChannelSettings(channelId);
  const leaveChannel = useLeaveChannel();
  const router = useRouter();

  const changeSettings = async (checked: boolean) => {
    if (!channelId) return;
    trigger({ muted: !checked, channelId });
  };
  const { t, i18n } = useTranslation();
  const selectedLanguage = i18n.language;
  return (
    <BottomSheetModalProvider>
      <Divider />
      <View tw="px-4 pb-6 pt-4">
        <Text tw="text-sm font-bold text-black dark:text-white">
          {t('channelsPage.Notifications')}
        </Text>
        <View tw="mt-4 flex-row items-center justify-between">
          <Text tw="text-sm text-black dark:text-white">
            {t('channelsPage.Alerts')}
          </Text>
          {isLoading ? (
            <Spinner size="small" /> // Assuming Spinner is a component for loading indication
          ) : (
            <Switch
              size="small"
              checked={!data?.muted}
              onChange={changeSettings}
            />
          )}
        </View>
        <Divider tw="my-4" />
        <View tw="flex-row items-center justify-between">
          <Text tw="text-sm font-bold text-black dark:text-white">
            {t('channelsPage.LeaveChannel')}
          </Text>
          <Button
            variant="danger"
            onPress={() => {
              Alert.alert(
                t('actions.LeaveGroup'),
                t('actions.LeaveGroupPrompt'),
                [
                  {
                    text: t('actions.Cancel'),
                    style: "cancel",
                  },
                  {
                    text: t('actions.Leave'),
                    style: "destructive",
                    onPress: async () => {
                      await leaveChannel.trigger({ channelId });
                      router.replace("/channels");
                    },
                  },
                ]
              );
            }}
            disabled={leaveChannel.isMutating}
          >
            {leaveChannel.isMutating ? t('actions.Leaving') : t('actions.Leave')}
          </Button>
        </View>
      </View>
    </BottomSheetModalProvider>
  );
};
