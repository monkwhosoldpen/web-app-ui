import { useCallback } from "react";

import { useUserProfile } from "./api-hooks";

function useJoin({ username }: { username?: string }) {
  //#region hooks
  const { mutate } = useUserProfile({ address: username });
  //#endregion

  //#region methods
  const onToggleJoin = useCallback(() => {
    mutate();
  }, [mutate]);
  //#endregion

  return {
    onToggleJoin,
  };
}

export { useJoin };
