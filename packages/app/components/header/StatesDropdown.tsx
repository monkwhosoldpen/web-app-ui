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
import { DistrictDropDown } from "./DistrictDropdown";

export const StatesDropDown = ({ stateChanged }: any) => {

    const { mutate } = useSWRConfig();
    const { i18n } = useTranslation();
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const { isAuthenticated } = useUser();
    const { data: myInfoData } = useMyInfo();
    const matchMutate = useMatchMutate();
    const stateSelected = myInfoData?.data?.profile?.state_code;
    // console.log(myInfoData?.data?.profile?.state_code);


    const org_active_states: any = ['TG'];

    const availableStates = [
        { locale: 'MH', name: 'Maharashtra' },
        { locale: 'GJ', name: 'Gujarat' },
        { locale: 'TG', name: 'Telangana' },
        { locale: 'AP', name: 'Andhra Pradesh' },
        { locale: 'TN', name: 'Tamil Nadu' },
        { locale: 'KL', name: 'Kerala' },
        { locale: 'KA', name: 'Karnataka' },
        { locale: 'UP', name: 'Uttar Pradesh' },
        { locale: 'DL', name: 'Delhi' },
        { locale: 'WB', name: 'West Bengal' },
    ];

    const handleLanguageOptionSelected = async (language: any) => {
        i18n.changeLanguage(language);
        setSelectedLanguage(language);
        localStorage.setItem('state_code', language);

        if (stateChanged) {
            stateChanged(language);
        }
        if (!isAuthenticated) {
            return;
        }
    };

    useEffect(() => {
        // TODO: Check api language
        const storedLanguage = localStorage.getItem('state_code');
        if (storedLanguage && availableStates.some((lang) => lang.locale === storedLanguage)) {
            setSelectedLanguage(storedLanguage);
            i18n.changeLanguage(storedLanguage);
        }
    }, []);

    useEffect(() => {
        // TODO: Check api language
        const storedLanguage = stateSelected || localStorage.getItem('state_code');
        if (storedLanguage && availableStates.some((lang) => lang.locale === storedLanguage)) {
            setSelectedLanguage(storedLanguage);
            i18n.changeLanguage(storedLanguage);
        }
    }, [myInfoData]);

    return (
        <>
            <View tw="mx-0">
                <DropdownMenuRoot>
                    <DropdownMenuTrigger>
                        <Button variant="tertiary"
                            style={{ backgroundColor: "", }}>
                            <>
                                <Text tw="text-base font-bold">
                                    {availableStates.find((lang) => lang?.locale === selectedLanguage)?.name || 'Unknown'}
                                </Text>
                            </>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent loop sideOffset={8}>
                        <div style={{ maxHeight: '240px', overflowY: 'scroll' }}>
                            {availableStates.map((lang, i) => (
                                <DropdownMenuItem key={lang?.locale} onSelect={() => handleLanguageOptionSelected(lang?.locale)}>
                                    <MenuItemIcon Icon={Edit} ios={{ name: "highlighter" }} />
                                    <DropdownMenuItemTitle tw="">
                                        {lang?.name}
                                    </DropdownMenuItemTitle>
                                </DropdownMenuItem>
                            ))}
                        </div>
                    </DropdownMenuContent>
                </DropdownMenuRoot>
            </View>
        </>
    );
};