import { useCallback, useMemo, createContext, useContext } from "react";

import { useWindowDimensions } from "react-native";
import { TabBarSingle } from "@showtime-xyz/universal.tab-view";
import { View } from "@showtime-xyz/universal.view";
import { breakpoints } from "design-system/theme";

const SettingsHeaderContext = createContext<{
    filter: string | undefined;
    setFilter: (type: string) => void;
}>({
    filter: undefined,
    setFilter: () => { },
});

const INITIAL_FILTER = "advanced";

type Query = {
    tab: "creator" | "drop";
    filter: string;
    article: any;
};

const { useParam } = createParam<Query>();

import { createParam } from "app/navigation/use-param";
import { ErrorBoundary } from "app/components/error-boundary";
import { WalletsTab } from "./wallets";
import { PushNotificationTab } from "./push-notifications";
import { AdvancedTab } from "./advanced";
import { useEffect, useState } from 'react';
import { AccountSettingItem } from "./settings-account-item";
import { Alert } from "@showtime-xyz/universal.alert";
import { useTranslation } from "react-i18next";


const Settingsmall = () => {

    const { width } = useWindowDimensions();
    const isMdWidth = width >= breakpoints["md"];

    const [filter, setFilter] = useParam("filter", { initial: INITIAL_FILTER });

    const contextValues = useMemo(
        () => ({ filter: filter, setFilter }),
        [filter, setFilter]
    );


    const { t, i18n } = useTranslation();

    const SETTINGS_ROUTE: any = [
        // {
        //     title: t('settingsPage.Profile'),
        //     key: "profile",
        //     index: 0,
        // },
        {
            title: t('settingsPage.Advanced'),
            key: "advanced",
            index: 0,
        },
        {

            title: t('settingsPage.Notifications'),
            key: "notifications",
            index: 1,
        },
    ];


    const tabIndex = useMemo(() => {
        const index = SETTINGS_ROUTE.findIndex((item: any) => item?.key === filter);
        if (index === -1) {
            return 0;
        }
        return index;
    }, [filter]);

    useEffect(() => {
        if (!filter) {
            setFilter('notifications');
        }
        // setName(item['name' + '_' + selectedLanguage]);
    }, []);

    return (
        <>
            <View tw="h-screen w-full border-l-0 border-gray-200 bg-white dark:border-gray-800 dark:bg-black md:border-l">
                <SettingsHeaderContext.Provider value={contextValues}>
                    <View tw="max-w-screen-content mx-auto w-full md:px-0">
                        <View tw="z-10 mx-auto w-full max-w-screen-xl">
                            <View tw="web:min-h-[50px]">
                                <TabBarSingle
                                    onPress={(index: number) => {
                                        setFilter(SETTINGS_ROUTE[index].key);
                                    }}
                                    tw={``}
                                    routes={SETTINGS_ROUTE}
                                    index={tabIndex}
                                    disableScrollableBar={false}
                                />

                                <View tw="">
                                    <View tw="pl-0">

                                        {filter === "notifications" ? (
                                            <>
                                                <PushNotificationTab index={2} />
                                            </>
                                        ) : null}

                                        {filter === "advanced" ? (
                                            <>
                                                <AdvancedTab index={3} />
                                            </>
                                        ) : null}

                                    </View>
                                </View>

                            </View>
                        </View>
                    </View>
                </SettingsHeaderContext.Provider>
            </View>
        </>
    );
};

export function SettingsSm() {
    return (
        <ErrorBoundary>
            <Settingsmall />
        </ErrorBoundary>
    );
}

