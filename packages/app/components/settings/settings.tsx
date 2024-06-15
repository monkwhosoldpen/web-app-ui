import { useWindowDimensions } from "react-native";
import { breakpoints } from "design-system/theme";
import { SettingsMd } from "./setting.md";
import { SettingsSm } from "./settings.sm";

export const Settings = () => {
    const { width } = useWindowDimensions();
    const isLgWidth = width >= breakpoints["lg"];
    return isLgWidth ? (
        <SettingsMd />
    ) : (
        <SettingsSm />
    );
};
