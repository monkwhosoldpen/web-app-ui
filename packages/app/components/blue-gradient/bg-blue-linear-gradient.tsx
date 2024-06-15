import { StyleSheet } from "react-native";

import { LinearGradient, LinearGradientProps } from "expo-linear-gradient";

const linearProps = {
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
  colors: [
    "#9CA3AF", // Muted blue-gray, versatile for both light and dark themes
    "#B0B8C5", // Lighter gray-blue, provides a soft transition
    "#9CA3AF", // Back to muted blue-gray for consistency
    "#C2C9D6", // Even lighter, almost silver-gray, for a gentle highlight
    "#9CA3AF", // Returning to the base color for balance
    "#B0B8C5", // Soft transition back to lighter tones
    "#C2C9D6", // Lightest tone for a subtle contrast
    "#9CA3AF", // Ending with the base color for cohesiveness
  ],
};

type BgBlueLinearGradientProps = Omit<LinearGradientProps, "colors"> & {
  colors?: LinearGradientProps["colors"];
};
export const BgBlueLinearGradient = ({
  ...rest
}: BgBlueLinearGradientProps) => {
  return (
    <LinearGradient
      style={[StyleSheet.absoluteFillObject]}
      pointerEvents="none"
      {...linearProps}
      {...rest}
    />
  );
};
