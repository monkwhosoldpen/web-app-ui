import { useContext } from "react";
import { AppStateContext } from "app/context/app-state-context";

export function useAppState(params?: any) {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("You need to add `AppStateProvider` to your root component");
  }

  const setArticle = (value: any) => {
    context.setArticle(value);
  };

  return {
    ...context,
    setArticle,
  };
}
