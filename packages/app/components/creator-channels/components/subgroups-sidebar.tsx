import { View } from "@showtime-xyz/universal.view";
import { Text } from "@showtime-xyz/universal.text";
import { Platform, ScrollView } from "react-native";
import { useSafeAreaInsets } from "@showtime-xyz/universal.safe-area";
import { styled } from "nativewind";

import { Showtime } from "@showtime-xyz/universal.icon";
import { useIsDarkMode } from "@showtime-xyz/universal.hooks";

type SubGroupsSidebarProps = {
    subgroups: any[];
    onSelectSubgroup: (id: string) => void;
    activeSubgroupId: string;
};

const StyledScrollView = styled(ScrollView);

export const SubGroupsSidebar = ({
    subgroups,
    onSelectSubgroup,
    activeSubgroupId,
}: SubGroupsSidebarProps) => {
    const insets = useSafeAreaInsets();
    const isDark = useIsDarkMode();
    return (
        <View
            tw="border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-black"
            style={{
                width: 50,
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                zIndex: 10
            }}
        >
            <StyledScrollView
                tw="flex-1"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: insets.bottom
                }}
            >
                {subgroups.map((subgroup) => (
                    <>
                        <View tw="items-center justify-center">

                            <Showtime
                                style={{ borderRadius: 8, overflow: "hidden", width: 24, height: 24 }}
                                color={isDark ? "#FFF" : "#000"}
                                width={24}
                                height={24}
                            />
                            <Text
                                numberOfLines={1}
                                style={{
                                    textAlign: 'center',
                                    width: '80%',
                                    paddingHorizontal: 4,
                                    marginVertical: 4
                                }}
                                tw="text-[10px] tracking-tight"
                            >
                                {subgroup.name}
                            </Text>

                        </View>

                    </>
                ))}
            </StyledScrollView>
        </View>
    );
}; 