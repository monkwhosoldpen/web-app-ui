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
import { availableStates } from "../location-selector";

export const DistrictDropDown = ({ state, changeDistrict }: any) => {

    const [selectedDistrict, setSelectedDistrict] = useState('en');
    const [availableDistricts, setAvailableDistricts] = useState<any>([]);

    const handleDistrictOptionSelected = async (district: any) => {
        setSelectedDistrict(district);
        changeDistrict(district);
    };

    useEffect(() => {
        // TODO: Check api language
    }, []);

    useEffect(() => {
        console.log(`State changed  ${state}`);
        setSelectedDistrict('unknown');
        const state_ = availableStates.find(state1 => state1?.name === state);
        if (state_) {
            const districts = state_?.availableDistricts || [];
            setAvailableDistricts(districts);
        } else {
            console.log(`State '${state}' not found.`);
        }
    }, [state]);

    return (
        <View tw="mx-0">
            <DropdownMenuRoot>
                <DropdownMenuTrigger>
                    <Button variant="tertiary" style={{ backgroundColor: "" }}
                        tw={[
                            "h-[25px] items-center justify-center rounded-full border border-gray-300 px-3.5 dark:border-gray-600",
                        ]}
                    >
                        <Text tw="text-xs font-bold dark:text-gray-900 text-white">
                            {availableDistricts.find((dis) => dis?.locale === selectedDistrict)?.name || 'Unknown'}
                        </Text>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent loop sideOffset={8}>
                    {/* Wrap the items in a div for scrolling */}
                    <div style={{ maxHeight: '240px', overflowY: 'scroll' }}>
                        {availableDistricts.map((dis, i) => (
                            <DropdownMenuItem key={dis?.locale} onSelect={() => handleDistrictOptionSelected(dis?.locale)}>
                                <MenuItemIcon Icon={Edit} ios={{ name: "highlighter" }} />
                                <DropdownMenuItemTitle tw="text-gray-700 dark:text-neutral-300">
                                    {dis?.name}
                                </DropdownMenuItemTitle>
                            </DropdownMenuItem>
                        ))}
                    </div>
                </DropdownMenuContent>
            </DropdownMenuRoot>
        </View>
    );

};