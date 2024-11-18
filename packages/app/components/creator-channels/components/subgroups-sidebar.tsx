import { View } from "@showtime-xyz/universal.view";
import { Text } from "@showtime-xyz/universal.text";
import { Platform, ScrollView, Pressable } from "react-native";
import { useSafeAreaInsets } from "@showtime-xyz/universal.safe-area";
import { styled } from "nativewind";

import { Showtime } from "@showtime-xyz/universal.icon";
import { useIsDarkMode } from "@showtime-xyz/universal.hooks";

type SubGroupsSidebarProps = {
    subgroups: Array<{
        subgroup_id: string;
        username: string;
        memberCount: number;
    }>;
    onSelectSubgroup: (id: string) => void;
    activeSubgroupId: string;
};

const StyledScrollView = styled(ScrollView);
const PressableHover = styled(Pressable);

export const mockSubgroups = [
    { subgroup_id: "main", username: "All Messages", memberCount: 0 },
    { subgroup_id: "1", username: "Group 1", memberCount: 0 },
    { subgroup_id: "2", username: "Group 2", memberCount: 0 },
];

export const SubGroupsSidebar = ({
    subgroups,
    onSelectSubgroup,
    activeSubgroupId,
}: SubGroupsSidebarProps) => {
    const insets = useSafeAreaInsets();
    const isDark = useIsDarkMode();

    // Create main group that will always be first
    const mainGroup = {
        subgroup_id: "main",
        username: "Main",
        memberCount: subgroups[0]?.memberCount || 0
    };

    // Combine main group with other subgroups
    const allGroups = [mainGroup, ...subgroups];

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
                    paddingVertical: 8,
                }}
            >
                {allGroups.map((subgroup, index) => (
                    <PressableHover
                        key={index}
                        onPress={() => onSelectSubgroup(subgroup.subgroup_id)}
                        tw="border-b border-gray-100 dark:border-gray-900"
                    >
                        <View
                            tw={[
                                "py-1 w-full",
                                activeSubgroupId === subgroup.subgroup_id
                                    ? "bg-gray-50 dark:bg-gray-900"
                                    : ""
                            ]}
                        >
                            <View
                                tw={[
                                    "mx-auto items-center justify-center",
                                    activeSubgroupId === subgroup.subgroup_id
                                        ? "opacity-100"
                                        : "opacity-70 hover:opacity-100"
                                ]}
                            >
                                <View
                                    tw={[
                                        "h-8 w-8 items-center justify-center rounded-full",
                                        activeSubgroupId === subgroup.subgroup_id
                                            ? "bg-gray-100 dark:bg-gray-800"
                                            : ""
                                    ]}
                                >
                                    <Showtime
                                        style={{
                                            borderRadius: 6,
                                            overflow: "hidden"
                                        }}
                                        color={isDark ? "#FFF" : "#000"}
                                        width={20}
                                        height={20}
                                    />
                                </View>

                                <Text
                                    numberOfLines={2}
                                    tw={[
                                        "text-[10px] text-center mt-0 leading-[11px]",
                                        activeSubgroupId === subgroup.subgroup_id
                                            ? "font-bold text-black dark:text-white"
                                            : "font-normal text-gray-700 dark:text-gray-300"
                                    ]}
                                    style={{
                                        width: 42,
                                        height: 22, // Force two lines height
                                    }}
                                >
                                    {subgroup.username}
                                </Text>
                            </View>
                        </View>
                    </PressableHover>
                ))}
            </StyledScrollView>
        </View>
    );
}; 