import { useRef, memo } from "react";

import { Spinner } from "@showtime-xyz/universal.spinner";
import { View } from "@showtime-xyz/universal.view";
import {
  useNotifications,
} from "app/hooks/use-notifications";
import { useScrollToTop } from "app/lib/react-navigation/native";
import { NotAuthenticatedPlaceholder } from "../not-authenticated-placeholder";

export const NotAuthenticated = memo(
  () => {
    const { data, isLoadingMore, isLoading } =
      useNotifications();

    const listRef = useRef<any>();
    useScrollToTop(listRef);

    if (!isLoading && data.length === 0) {
      return (
        <NotAuthenticatedPlaceholder
          title="Not Authenticated."
          tw="flex-1 items-center justify-center"
        />
      );
    }

    if (isLoading && data.length === 0 && isLoadingMore) {
      return (
        <View tw="flex-1 items-center justify-center">
          <Spinner size="small" />
        </View>
      );
    }

    return (
      <></>
    );
  }
);

NotAuthenticated.displayName = "NotAuthenticated";
