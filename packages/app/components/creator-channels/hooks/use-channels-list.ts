import { useCallback, useMemo } from "react";

import { fetcher, useInfiniteListQuerySWR } from "app/hooks/use-infinite-list-query";
import { useUser } from "app/hooks/use-user";

import { Channel } from "../types";

export type CreatorChannel = Omit<
  Channel,
  "latest_message_updated_at" | "latest_message"
>;


import useSWR from "swr";

import { MyInfo } from "app/types";
import { useMyInfo } from "app/hooks/api-hooks";

const PAGE_SIZE = 15;

export const useOwnedChannelsList = () => {
  const { isAuthenticated } = useUser();
  const channelsFetcher = useCallback(
    (index: number, previousPageData: []) => {
      if (previousPageData && !previousPageData.length) return null;
      return isAuthenticated ? `` : ""; // hardcode for now
    },
    [isAuthenticated]
  );

  const queryState = useInfiniteListQuerySWR<CreatorChannel[]>(
    channelsFetcher,
    {
      pageSize: PAGE_SIZE,
    }
  );
  const newData = useMemo(() => {
    let newData: CreatorChannel[] = [];
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

// export const useJoinedChannelsList = () => {
//   const { isAuthenticated } = useUser();
//   const channelsFetcher = useCallback(
//     (index: number, previousPageData: []) => {
//       if (previousPageData && !previousPageData.length) return null;
//       return isAuthenticated
//         ? `/v1/channels/joined?page=${index + 1}&limit=${PAGE_SIZE}`
//         : "";
//     },
//     [isAuthenticated]
//   );

//   const queryState = useInfiniteListQuerySWR<CreatorChannel[]>(
//     channelsFetcher,
//     {
//       pageSize: PAGE_SIZE,
//     }
//   );
//   const newData = useMemo(() => {
//     let newData: CreatorChannel[] = [];
//     if (queryState.data) {
//       queryState.data.forEach((p) => {
//         if (p) {
//           newData = newData.concat(p);
//         }
//       });
//     }
//     return newData;
//   }, [queryState.data]);

//   return {
//     ...queryState,
//     data: newData,
//   };
// };

export const useSuggestedChannelsList = (params?: { pageSize?: number }) => {
  const pageSize = params?.pageSize || PAGE_SIZE;
  const channelsFetcher = useCallback(
    (index: number, previousPageData: []) => {
      if (previousPageData && !previousPageData.length) return null;
      return `/v1/channels/suggested?page=${index + 1}&limit=${pageSize}`;
    },
    [pageSize]
  );

  const queryState = useInfiniteListQuerySWR<CreatorChannel[]>(
    channelsFetcher,
    {
      pageSize,
    }
  );
  const newData = useMemo(() => {
    let newData: CreatorChannel[] = [];
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


export const useChannelsList = (params: any) => {

  const { isAuthenticated } = useUser();
  const { data: myInfoData } = useMyInfo();
  const PAGE_SIZE = 15;
  const pageSize = params?.pageSize || PAGE_SIZE;
  const index = params?.index || 0;
  let location = 'INDIA';
  const limit = 20;

  const fetchUrl = useCallback(
    (index: number, previousPageData: any) => {
      if (previousPageData && !previousPageData?.creator_tokens.length)
        return null;

      return `/v5/getChannels?page=${index + 1}&location=${location}&limit=${pageSize}`;
    },
    [limit]
  );

  // const {
  //   data,
  //   fetchMore: fetchMoreData,
  //   isLoading,
  //   mutate,
  //   ...queryState
  // } = useInfiniteListQuerySWR<TopCreatorToken>(fetchUrl, {
  //   pageSize: limit,
  // });

  const { data, error, mutate, isValidating, isLoading } = useSWR<any>(
    () => {
      // Generate a unique key that includes the location to force re-fetching
      const key = isAuthenticated
        ? `/v5/getChannels?page=${index + 1}&location=${location}&limit=${pageSize}`
        : `/v5/getChannels?page=${index + 1}&location=${location}&limit=${pageSize}`;
      return key;
    },
    fetcher,
    {
      revalidateOnMount: false,
      revalidateIfStale: false,
      dedupingInterval: 5000,
      focusThrottleInterval: 30000,
    }
  );

  const refetchChannels = useCallback(
    async () => {
      await mutate();
    },
    [data, mutate]
  );

  const {
    fetchMore: fetchMoreData,

    ...queryState
  } = useInfiniteListQuerySWR<any>(fetchUrl, {
    pageSize: limit,
  });

  // const newData = useMemo(() => {
  //   let newData: any["creator_tokens"] = [];
  //   if (data) {
  //     data.forEach((p) => {
  //       if (p) {
  //         newData = newData.concat(p.creator_tokens);
  //       }
  //     });
  //   }
  //   return newData;
  // }, [data]);

  // const fetchMore = useCallback(() => {
  //   if (newData.length >= 50) return;
  //   fetchMoreData();
  // }, [fetchMoreData, newData.length]);

  return {
    ...queryState,
    isLoading,
    // fetchMore,
    data: data,
    error,
    refetchChannels,
    mutate,
  };
};