import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import { axios } from "app/lib/axios";

import { fetcher } from "./use-infinite-list-query";
import { useUser } from "./use-user";

const pushMockData = {
  "uid": "sample@gmail.com",
  "location_new_message": false,
  "channel_new_message": false,
  "summary_end_of_day": false,
  "summary_start_of_day": false
};

const mockData = pushMockData;

export function usePushNotificationsPreferences() {
  const { user: currentUser, isAuthenticated } = useUser();
  const { data, error, mutate, isLoading } = useSWR<any>(
    isAuthenticated ? "/v1/notifications/preferences/push" : null,
    fetcher
  );

  return {
    data: isAuthenticated ? data : mockData, // Use mockData when not authenticated
    loading: !data && isAuthenticated,
    isLoading,
    error,
    refresh: mutate,
  };
}

async function editPushSettings(
  url: string,
  { arg }: { arg: { pushKey: any; pushValue: boolean } }
) {
  return axios({
    url: `/v1/notifications/preferences/push`,
    method: "PATCH",
    data: {
      [arg.pushKey]: arg.pushValue,
    },
  });
}

export const useEditPushNotificationsPreferences = () => {
  const { trigger, isMutating, error } = useSWRMutation(
    `/v1/notifications/preferences/push`,
    editPushSettings
  );

  return {
    trigger,
    isMutating,
    error,
  };
};
