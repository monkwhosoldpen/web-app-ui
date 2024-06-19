import { useCallback, memo, useMemo } from "react";
import { useTranslation } from 'react-i18next'; // Import the translation hook
import { Alert } from "@showtime-xyz/universal.alert";
import { Button } from "@showtime-xyz/universal.button";
import type { ButtonProps } from "@showtime-xyz/universal.button";
import { useMyInfo } from "app/hooks/api-hooks";

type ToggleFollowParams = ButtonProps & {
  name?: string;
  username: any;
  onToggleFollow?: () => void;
  renderButton?: ({
    isFollowing,
    onPress,
    text,
  }: {
    isFollowing: boolean;
    onPress: () => void;
    text: string;
  }) => React.ReactNode;
};

export const FollowButton = memo<ToggleFollowParams>(function FollowButton({
  username,
  name,
  onToggleFollow,
  renderButton,
  ...rest
}) {
  const { t, i18n } = useTranslation(); // Initialize translation

  const { unfollow, follow, data, isFollowing: isFollowingFn } = useMyInfo();

  const isFollowing = useMemo(
    () => isFollowingFn(username),
    [username, isFollowingFn]
  );

  const text = useMemo(
    () => (isFollowing ? t("Following") : t("Follow")), // Use translated strings
    [isFollowing, t]
  );

  const toggleFollow = useCallback(async () => {
    // Alert translation
    const unfollowAlert = t('Unfollow {{name}}?', { name: name ? `@${name}` : "" });
    if (isFollowing) {
      Alert.alert(unfollowAlert, "", [
        {
          text: t("Cancel"),
          style: "cancel",
        },
        {
          text: t("Unfollow"),
          style: "destructive",
          onPress: async () => {
            await unfollow(username);
            onToggleFollow?.();
          },
        },
      ]);
    } else {
      await follow(username);
      onToggleFollow?.();
    }
  }, [follow, unfollow, isFollowing, username, name, onToggleFollow, t]);

  // if (data?.data?.profile?.profile_id === username) return null;
  if (renderButton) {
    return (
      <>
        {renderButton({
          isFollowing,
          onPress: toggleFollow,
          text,
        })}
      </>
    );
  }
  return (
    <Button
      variant={isFollowing ? "tertiary" : "primary"}
      onPress={toggleFollow}
      {...rest}
    >
      {text}
    </Button>
  );
});

FollowButton.displayName = "FollowButton";
