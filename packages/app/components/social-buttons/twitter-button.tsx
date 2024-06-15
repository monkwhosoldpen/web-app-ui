import { memo } from "react";

import { Button, ButtonProps } from "@showtime-xyz/universal.button";
import { Twitter } from "@showtime-xyz/universal.icon";
import { colors } from "@showtime-xyz/universal.tailwind";

export const TwitterButton = memo(function TwitterButton({
  ctaCopy = "Post to X",
  ...rest
}: { ctaCopy?: string } & ButtonProps) {
  return (
    <Button size="regular" {...rest}>
      <Twitter color={colors.twitter} width={20} height={20} />
      {` ${ctaCopy}`}
    </Button>
  );
});
