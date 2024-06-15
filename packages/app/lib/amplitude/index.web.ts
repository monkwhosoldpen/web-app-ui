import * as amplitude from "@amplitude/analytics-browser";
import * as Types from "@amplitude/analytics-types";

const userId = 'NCONNECT';

if (process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY && typeof window !== "undefined")
  amplitude.init(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY, userId);

export { amplitude, Types };
