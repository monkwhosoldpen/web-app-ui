import { useCallback, useMemo } from "react";

import { useInfiniteListQuerySWR } from "app/hooks/use-infinite-list-query";
import { useUser } from "app/hooks/use-user";

export type Goat = any;

const PAGE_SIZE = 15;

export const useAllNetasList = () => {
  const { isAuthenticated } = useUser();
  const channelsFetcher = useCallback(
    (index: number, previousPageData: []) => {
      if (previousPageData && !previousPageData.length) return null;
      return isAuthenticated ? `/api/v4/profile_server/all` : "/api/v4/profile_server/all"; // hardcode for now
    },
    [isAuthenticated]
  );

  const queryState = useInfiniteListQuerySWR<Goat[]>(
    channelsFetcher,
    {
      pageSize: PAGE_SIZE,
    }
  );
  const newData = useMemo(() => {
    let newData: Goat[] = [];
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

export const useSuggestedNetasList = () => {
  const { isAuthenticated } = useUser();
  const channelsFetcher = useCallback(
    (index: number, previousPageData: []) => {
      if (previousPageData && !previousPageData.length) return null;
      if (previousPageData && !previousPageData.length) return null;
      return isAuthenticated ? `/api/v4/profile_server/all` : "/api/v4/profile_server/all"; // hardcode for now
    },
    [isAuthenticated]
  );

  const queryState = useInfiniteListQuerySWR<Goat[]>(
    channelsFetcher,
    {
      pageSize: PAGE_SIZE,
    }
  );
  const newData = useMemo(() => {
    let newData: Goat[] = [];
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

export const usePopularNetasList = () => {
  const { isAuthenticated } = useUser();
  const channelsFetcher = useCallback(
    (index: number, previousPageData: []) => {
      if (previousPageData && !previousPageData.length) return null;
      return isAuthenticated ? `/api/v4/profile_server/all` : "/api/v4/profile_server/all"; // hardcode for now
    },
    [isAuthenticated]
  );

  const queryState = useInfiniteListQuerySWR<Goat[]>(
    channelsFetcher,
    {
      pageSize: PAGE_SIZE,
    }
  );
  const newData = useMemo(() => {
    let newData: Goat[] = [];
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
