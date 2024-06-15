import { useCallback, useMemo } from "react";

import { useInfiniteListQuerySWR } from "app/hooks/use-infinite-list-query";
import { useUser } from "app/hooks/use-user";

export type GOAT = any;

const PAGE_SIZE = 15;

export const useAllEntitiesList = () => {
  const { isAuthenticated } = useUser();
  const channelsFetcher = useCallback(
    (index: number, previousPageData: []) => {
      if (previousPageData && !previousPageData.length) return null;
      return isAuthenticated ? `/api/v4/profile_server/all` : "/api/v4/profile_server/all"; // hardcode for now
    },
    [isAuthenticated]
  );

  const queryState = useInfiniteListQuerySWR<GOAT[]>(
    channelsFetcher,
    {
      pageSize: PAGE_SIZE,
    }
  );
  const newData = useMemo(() => {
    let newData: GOAT[] = [];
    if (queryState.data) {
      queryState.data.forEach((p) => {
        if (p) {
          newData = newData.concat(p);
        }
      });
    }
    return newData;
  }, [queryState.data]);
  return {
    ...queryState,
    data: newData,
  };
};

export const useSuggestedEntitiesList = () => {
  const { isAuthenticated } = useUser();
  const channelsFetcher = useCallback(
    (index: number, previousPageData: []) => {
      if (previousPageData && !previousPageData.length) return null;
      if (previousPageData && !previousPageData.length) return null;
      return isAuthenticated ? `/api/v4/profile_server/all` : "/api/v4/profile_server/all"; // hardcode for now
    },
    [isAuthenticated]
  );

  const queryState = useInfiniteListQuerySWR<GOAT[]>(
    channelsFetcher,
    {
      pageSize: PAGE_SIZE,
    }
  );
  const newData = useMemo(() => {
    let newData: GOAT[] = [];
    if (queryState.data) {
      queryState.data.forEach((p) => {
        if (p) {
          newData = newData.concat(p);
        }
      });
    }
    return newData;
  }, [queryState.data]);

  return {
    ...queryState,
    data: newData,
  };
};

export const usePopularEntitiesList = () => {
  const { isAuthenticated } = useUser();
  const channelsFetcher = useCallback(
    (index: number, previousPageData: []) => {
      if (previousPageData && !previousPageData.length) return null;
      return isAuthenticated ? `/api/v4/profile_server/all` : "/api/v4/profile_server/all"; // hardcode for now
    },
    [isAuthenticated]
  );

  const queryState = useInfiniteListQuerySWR<GOAT[]>(
    channelsFetcher,
    {
      pageSize: PAGE_SIZE,
    }
  );
  const newData = useMemo(() => {
    let newData: GOAT[] = [];
    if (queryState.data) {
      queryState.data.forEach((p) => {
        if (p) {
          newData = newData.concat(p);
        }
      });
    }
    return newData;
  }, [queryState.data]);

  return {
    ...queryState,
    data: newData,
  };
};
