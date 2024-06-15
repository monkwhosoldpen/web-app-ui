import React, { useState } from "react";

import { MotiView } from "moti";

import { Button } from "@showtime-xyz/universal.button";
import { View } from "@showtime-xyz/universal.view";

import { Spinner } from "design-system/spinner";
import { useRouter } from "@showtime-xyz/universal.router";
import { LocationSelector } from "./location-selector";

import { useSWRConfig } from "swr";
import { useMatchMutate } from "app/hooks/use-match-mutate";
import { axios } from "app/lib/axios";
import { MY_INFO_ENDPOINT } from "app/providers/user-provider";
import { USER_PROFILE_KEY } from "app/hooks/api-hooks";
import { Logger } from "app/lib/logger";
import { Text } from "@showtime-xyz/universal.text";
import { useModalScreenContext } from "@showtime-xyz/universal.modal-screen";
import { useEffect, useContext, useRef } from "react";

export const SetPreferences = () => {

  const router = useRouter();

  const [isValid, setIsValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [activeState, setactiveState] = useState<any>('');
  const [activeDistrict, setactiveDistrict] = useState<any>('');

  const { mutate } = useSWRConfig();
  const matchMutate = useMatchMutate();

  const handleChange = (data) => {
    const newState = data.activeState.name || '';
    const newDistrict = data.activeDistrict || '';
    setactiveState(newState);
    setactiveDistrict(newDistrict);
    setIsValid(data?.isValidState && data?.isValidDistrict);
  };

  const handleSubmitForm = async () => {
    const newValues = {
      state_code: activeState,
      district_code: activeDistrict,
      location_code: activeDistrict
    };
    setIsSubmitting(true);
    try {
      await axios({
        url: "/v1/editinfo",
        method: "POST",
        data: newValues,
      });
      // TODO: optimise to make fewer API calls!
      mutate(MY_INFO_ENDPOINT);
      matchMutate(
        (key) => typeof key === "string" && key.includes(USER_PROFILE_KEY)
      );
      setIsSubmitting(false);
      router.pop();
    } catch (e) {
      setIsSubmitting(false);
      Logger.error("Location data save failed ", e);
    }
  };

  const modalScreenContext = useModalScreenContext();

  useEffect(() => {
    modalScreenContext?.setTitle("Location Selector ✦");
  }, [modalScreenContext]);


  return (
    <>
      <LocationSelector handleChange={handleChange} />

      <MotiView
        from={{
          opacity: 0,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        exit={() => {
          "worklet";
          return {
            opacity: 0,
            scale: 0.9,
          };
        }}
        exitTransition={{
          type: "timing",
          duration: 600,
        }}
        style={{ flex: 1 }}
      >
        <View tw="flex-1 px-4 text-center">
          <View tw="mt-0 flex flex-grow-0">
            <View tw="h-4" />
            <Button
              size="regular"
              disabled={!isValid}
              onPress={async () => {
                try {
                  handleSubmitForm();
                } catch {
                  // do nothing
                }
              }}
              tw={`mt-2}`}
            >
              {'Save'}
              {isSubmitting ? (
                <View tw="absolute right-4 scale-75 justify-center">
                  <Spinner size="small" color="darkgrey" />
                </View>
              ) : (
                <></>
              )}
            </Button>
          </View>
        </View>
      </MotiView>
    </>
  );
};
