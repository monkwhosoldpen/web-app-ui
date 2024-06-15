import { Button } from "@showtime-xyz/universal.button";
import { Edit } from "@showtime-xyz/universal.icon";

import { MenuItemIcon } from "app/components/dropdown/menu-item-icon";
import { WalletAddressesV2 } from "app/types";
import React from "react";
import {
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuItemTitle,
    DropdownMenuRoot,
    DropdownMenuTrigger,
} from "design-system/dropdown-menu";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { View } from "@showtime-xyz/universal.view";

import { useSWRConfig } from "swr";
import { axios } from "app/lib/axios";
import { Logger } from "app/lib/logger";
import { useUser } from "app/hooks/use-user";
import { MY_INFO_ENDPOINT } from "app/providers/user-provider";
import { USER_PROFILE_KEY, useMyInfo } from "app/hooks/api-hooks";
import { Text } from "@showtime-xyz/universal.text";
import { useMatchMutate } from "app/hooks/use-match-mutate";

export const LanguageDropDown = () => {

    const { mutate } = useSWRConfig();
    const { i18n } = useTranslation();
    const [selectedLanguage, setSelectedLanguage] = useState('english');
    const { isAuthenticated } = useUser();
    const { data: myInfoData } = useMyInfo();
    const matchMutate = useMatchMutate();
    const languageSelected = myInfoData?.data?.profile?.language_code;
    // console.log(myInfoData?.data?.profile?.language_code);

    const availableLanguages = [
        { locale: 'english', name: 'English' },
        { locale: 'hindi', name: 'Hindi' },
        { locale: 'telugu', name: 'Telugu' },
    ];

    const handleLanguageOptionSelected = async (language: any) => {
        i18n.changeLanguage(language);
        setSelectedLanguage(language);
        localStorage.setItem('language', language);
        if (!isAuthenticated) {
            return;
        }
        try {
            await axios({
                url: "/v1/editinfo",
                method: "POST",
                data: {
                    language_code: language
                },
            });
            mutate(MY_INFO_ENDPOINT);
            matchMutate(
                (key) => typeof key === "string" && key.includes(USER_PROFILE_KEY)
            );
        } catch (e) {
            Logger.error("Profile Username Onboarding failed ", e);
        }
    };

    useEffect(() => {
        // TODO: Check api language
        const storedLanguage = localStorage.getItem('language');
        if (storedLanguage && availableLanguages.some((lang) => lang.locale === storedLanguage)) {
            setSelectedLanguage(storedLanguage);
            i18n.changeLanguage(storedLanguage);
        }
    }, []);

    useEffect(() => {
        // TODO: Check api language
        const storedLanguage = languageSelected || localStorage.getItem('language');
        if (storedLanguage && availableLanguages.some((lang) => lang.locale === storedLanguage)) {
            setSelectedLanguage(storedLanguage);
            i18n.changeLanguage(storedLanguage);
        }
    }, [languageSelected]);

    return (
        <View tw="ml-2">
            <DropdownMenuRoot>
                <DropdownMenuTrigger>
                    <Button variant="primary"
                        tw={[
                            "h-[25px] items-center justify-center rounded-full border border-gray-300 px-3.5 dark:border-gray-600",
                        ]}
                        style={{ backgroundColor: "", }}>
                        <>
                            <Text tw="text-xs font-bold dark:text-gray-900 text-white">
                                {availableLanguages.find((lang) => lang?.locale === selectedLanguage)?.name || 'Unknown'}
                            </Text>
                        </>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent loop sideOffset={8}>
                    {availableLanguages.map((lang, i) => (
                        <React.Fragment key={i}>
                            <DropdownMenuItem key={lang?.locale}
                                onSelect={() => handleLanguageOptionSelected(lang?.locale)}
                            >
                                <MenuItemIcon Icon={Edit} ios={{ name: "highlighter" }} />
                                <DropdownMenuItemTitle tw="text-gray-700 dark:text-neutral-300">
                                    {lang?.name}
                                </DropdownMenuItemTitle>
                            </DropdownMenuItem>
                        </React.Fragment>
                    ))}
                </DropdownMenuContent>
            </DropdownMenuRoot>
        </View>
    );
};