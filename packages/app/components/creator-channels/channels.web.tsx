import { useWindowDimensions } from "react-native";
import { breakpoints } from "design-system/theme";

import { useRouter } from "@showtime-xyz/universal.router";
import { ChannelsTitle, CreatorChannelsList as CreatorChannelsListMobile } from "./list";
import { Messages } from "./messages";
import { View } from "@showtime-xyz/universal.view";
import { ChannelsList } from "./components/channels-list";
import { useTranslation } from "react-i18next";

const CreatorChannels = ({ username }: any) => {
    const router = useRouter();
    const { height: windowHeight, width } = useWindowDimensions();
    const isLgWidth = width >= breakpoints["lg"];
    const { t } = useTranslation();

    if (!isLgWidth) {
        if (router.query["channelId"]) {
            return (
                <View tw="h-[100svh] w-full">
                    <Messages />
                </View>
            );
        }
        return (
            <View tw="h-screen w-full bg-white dark:bg-black">
                <CreatorChannelsListMobile username={""} />
            </View>
        );
    }
    return (
        <>
            <View tw="h-screen w-full flex-row bg-white dark:bg-black">
                <View tw="h-full w-80 overflow-scroll border-l border-r border-gray-200 dark:border-gray-800">
                    <View tw="w-full flex-row">
                        <View tw="flex-1">
                            <>
                                <>
                                    <View tw="">
                                        <ChannelsList />
                                    </View>
                                </>
                            </>
                        </View>
                    </View>
                </View>
                <View tw="h-full flex-1 overflow-hidden">
                    <Messages />
                </View>
            </View >
        </>
    );
};

export { CreatorChannels as CreatorChannels };
