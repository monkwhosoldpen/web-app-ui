import { View } from "design-system";
import { Showtime } from "design-system/icon";
import { Text } from "@showtime-xyz/universal.text";

type ShowtimeBrandLogoProps = {
  color?: string;
  size?: number;
};

export const ShowtimeBrandLogo = ({
  color = "#FF0000", // Assuming you want a red hex code as the default color
  size = 18, // Default size
}: ShowtimeBrandLogoProps) => {
  return (
    <View tw="flex-row items-center"> {/* Center align items */}
      <Showtime color={color} width={size} height={size} />
      <View tw="w-1" />
      <Text
        style={{ color: color }}
        tw="text-lg font-bold tracking-wider uppercase" // Increased font size to text-lg
      >
        GoatsConnect
      </Text>
    </View>
  );
};
