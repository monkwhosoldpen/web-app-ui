import { useMemo, useCallback } from "react";

import useSWR from "swr";

import { ChannelMessage } from "app/components/creator-channels/types";
import {
  fetcher,
  useInfiniteListQuerySWR,
} from "app/hooks/use-infinite-list-query";
import { Profile } from "app/types";

export type CreatorTokenUser = {
  verified: boolean;
  bio: string | null;
  profile_id: number;
  name: string;
  username: string;
  wallet_address: string;
  wallet_address_nonens: string;
  img_url: string;
};
export type CreatorTokenItem = {
  id: number;
  username?: any;
  owner_profile?: Profile;
  owner_address: string;
  name: string;
  token_uri: string;
  nft_count: number;
};
export type NewCreatorTokenItem = {
  creator_token: CreatorTokenItem;
  last_channel_message: ChannelMessage;
};
export type TopCreatorTokenUser = NewCreatorTokenItem | CreatorTokenItem;

export type CreatorTokenCollectors = {
  profiles: CreatorTokenUser[];
};
export type TopCreatorToken = {
  creator_tokens: TopCreatorTokenUser[];
};

export const useCreatorTokenCollectors = (
  creatorTokenId?: number | string,
  limit?: number
) => {
  const { data, isLoading, mutate, error } = useSWR<CreatorTokenCollectors>(
    creatorTokenId
      ? `/v1/creator-token/collectors?creator_token_id=${creatorTokenId}`
      : "",
    fetcher,
    { revalidateOnFocus: false }
  );
  const newData = useMemo(() => {
    if (limit) {
      return data?.profiles.slice(0, limit);
    }
    return data?.profiles;
  }, [data, limit]);

  return {
    data: newData,
    count: data?.profiles.length || 0,
    isLoading,
    mutate,
    error,
  };
};

export const useTopCreatorToken = (
  limit: number = 20,
  category?: string
) => {
  const { data, isLoading, mutate, error, isValidating } = useSWR<CreatorTokenCollectors>(
    `/v1/creator-token/top?limit=${limit}${category ? `&category=${category}` : ''}`,
    async (url: string) => {
      console.log('Selected Category:', category);
      await new Promise(resolve => setTimeout(resolve, 500));
      return fetcher(url);
    },
    { revalidateOnFocus: false }
  );

  const refetchTop = useCallback(async () => {
    console.log('Refetching with category:', category);
    await new Promise(resolve => setTimeout(resolve, 500));
    return mutate();
  }, [mutate, category]);

  const isRefetching = !isLoading && isValidating;

  return {
    data,
    isLoading,
    isRefetching,
    mutate,
    error,
    refetchTop
  };
};

export const useCreatorTokenCoLlected = (
  profileId?: number | string,
  limit?: number
) => {
  const { data, isLoading, mutate, error } = useSWR<CreatorTokenCollectors>(
    profileId ? `/v1/creator-token/collected?profile_id=${profileId}` : "",
    fetcher,
    { revalidateOnFocus: false }
  );
  const newData = useMemo(() => {
    if (limit) {
      return data?.profiles.slice(0, limit);
    }
    return data?.profiles;
  }, [data, limit]);

  return {
    data: newData,
    count: data?.profiles.length || 0,
    isLoading,
    mutate,
    error,
  };
};

export const useTopParties = (limit: number = 20): any => {
  const fetchUrl = useCallback(
    (index: number, previousPageData: any) => {
      if (previousPageData && !previousPageData?.creator_tokens.length)
        return null;

      return `/v1/creator-token/parties?page=${index + 1}&limit=${limit}`;
    },
    [limit]
  );

  const {
    data,
    fetchMore: fetchMoreData,
    isLoading,
    ...queryState
  } = useInfiniteListQuerySWR<TopCreatorToken>(fetchUrl, {
    pageSize: limit,
  });

  const newData = useMemo(() => {
    let newData: TopCreatorToken["creator_tokens"] = [];
    if (data) {
      data.forEach((p) => {
        if (p) {
          newData = newData.concat(p.creator_tokens);
        }
      });
    }
    return newData;
  }, [data]);

  const fetchMore = useCallback(() => {
    if (newData.length >= 50) return;
    fetchMoreData();
  }, [fetchMoreData, newData.length]);

  return {
    ...queryState,
    isLoading,
    fetchMore,
    data: newData,
  };
};
