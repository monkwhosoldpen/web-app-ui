import { useRef, useState } from "react";

import { axios } from "../lib/axios";
import { Logger } from "../lib/logger";
import { useUser } from "./use-user";

export const useValidateZipCode = () => {
  const [isValid, setIsValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const debounceTimeout = useRef<any>(null);
  const lastInput = useRef<string | null>(null);

  async function validateZipCode(value: string) {
    const zipcode = value ? value.trim() : null;
    try {
      setIsLoading(true);
      if (
        zipcode === null ||
        zipcode.toLowerCase() === user?.data?.profile?.location?.toLowerCase()
      ) {
        setIsValid(true);
      } else if (zipcode.length > 1) {
        const res = await axios({
          url: `/v1/ZipCodeLocation?zipcode=${zipcode}`,
          method: "get",
        });

        if (res.data) {
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      }
    } catch (e) {
      Logger.error("ZipCode/Location validate api failed ", e);
    } finally {
      setIsLoading(false);
    }
  }

  function debouncedValidate(value: string) {
    if (value !== lastInput.current && !isLoading) {
      setIsLoading(true);
    }

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      validateZipCode(value);
    }, 400);

    lastInput.current = value;
  }

  return {
    isValid,
    isLoading,
    validate: debouncedValidate,
  };
};
