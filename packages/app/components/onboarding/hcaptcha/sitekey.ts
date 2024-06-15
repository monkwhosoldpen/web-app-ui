export const siteKey =
  process.env.E2E || __DEV__ || process.env.NEXT_PUBLIC_STAGE === "development"
    ? "81768f93-c905-4de1-84ac-4cd26ec584ff"
    : "81768f93-c905-4de1-84ac-4cd26ec584ff";
