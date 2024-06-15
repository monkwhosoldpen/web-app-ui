import { View } from "@showtime-xyz/universal.view";

import { Text } from "@showtime-xyz/universal.text";
import { useTranslation } from "react-i18next";

export type ProfileScreenProps = {
  username: string;
};

import { ButtonProps } from "@showtime-xyz/universal.button";
import { ChannelsList } from "./components/channels-list";

type Props = {
  title: string;
  titleTw?: string;
  descTw?: string;
  desc?: string | JSX.Element;
  buttonText?: string;
  buttonProps?: ButtonProps;
  onPress?: () => void;
  tw?: string;
};

export const ChannelsTitle = ({
  title,
  desc,
  buttonText,
  onPress,
  tw = "",
  titleTw = "text-xl font-bold text-gray-900 dark:text-white",
  descTw = "mt-4",
  buttonProps = {},
}: Props) => {
  return (
    <View tw={["flex p-4 lg:p-0", tw]}>
      <View tw="h-8 flex-row items-center justify-between">
        {Boolean(title) && <Text tw={titleTw}>{title}</Text>}
      </View>
      {Boolean(desc) && (
        <>
          <View tw={descTw}>
            <Text tw="text-sm text-gray-900 dark:text-white">{desc}</Text>
          </View>
        </>
      )}
    </View>
  );
};

const CreatorChannelsList = ({ username }: ProfileScreenProps) => {
  const { t } = useTranslation(); // Initialize the translation function
  return (
    <>
      <View tw="w-full flex-row pb-8">
        <View tw="flex-1">
          <>
            <>
              <View tw="pb-4">
                <ChannelsList />
              </View>
            </>
          </>
        </View>
      </View>
    </>
  );
};

export { CreatorChannelsList as CreatorChannelsList };
