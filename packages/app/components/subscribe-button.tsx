import { useCallback, memo, useMemo } from "react";
import { useTranslation } from 'react-i18next'; // Import the translation hook
import { Alert } from "@showtime-xyz/universal.alert";
import { Button } from "@showtime-xyz/universal.button";
import type { ButtonProps } from "@showtime-xyz/universal.button";
import { useMyInfo } from "app/hooks/api-hooks";

type ToggleFollowParams = ButtonProps & {
  name?: string;
  profileId: number;
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

export const SubscribeButton = memo<ToggleFollowParams>(function SubscribeButton({
  profileId,
  name,
  onToggleFollow,
  renderButton,
  ...rest
}) {
  const { t, i18n } = useTranslation(); // Initialize translation

  const { unfollow, follow, data, isFollowing: isFollowingFn } = useMyInfo();

  const isFollowing = useMemo(
    () => isFollowingFn(profileId),
    [profileId, isFollowingFn]
  );

  const text = useMemo(
    () => (isFollowing ? t("Joined") : t("Join")), // Use translated strings
    [isFollowing, t]
  );

  const toggleFollow = useCallback(async () => {
    // Alert translation
    const unfollowAlert = t('Leave {{name}}?', { name: name ? `@${name}` : "" });
    if (isFollowing) {
      Alert.alert(unfollowAlert, "", [
        {
          text: t("Cancel"),
          style: "cancel",
        },
        {
          text: t("Leave"),
          style: "destructive",
          onPress: async () => {
            await unfollow(profileId);
            onToggleFollow?.();
          },
        },
      ]);
    } else {
      await follow(profileId);
      onToggleFollow?.();
    }
  }, [follow, unfollow, isFollowing, profileId, name, onToggleFollow, t]);

  if (data?.data?.profile?.profile_id === profileId) return null;
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

SubscribeButton.displayName = "SubscribeButton";
