import { createContext, useState } from "react";

export type UserContextType = {
  slug: any; // Initial slug value
  setSlug: (value: any) => void;
};

export const AppStateContext = createContext<UserContextType | any>(null);
