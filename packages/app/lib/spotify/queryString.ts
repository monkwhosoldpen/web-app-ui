import { Platform } from "react-native";

export const redirectUri = Platform.select({
  web: `${__DEV__
    ? "http://localhost:3000"
    : "https://" + process.env.NEXT_PUBLIC_WEBSITE_DOMAIN
    }/spotify-auth/redirect`,
  default: `io.goatsconnect${__DEV__ ? ".development" : ""}://spotify-success`,
});

export const scope = "user-library-modify";

export const clientID = "e12f7eea542947ff843cfc68d762235a";

export const getQueryString = () => {
  const params = {
    client_id: clientID,
    scope,
    redirect_uri: redirectUri,
    response_type: "code",
  };

  const queryString = Object.entries(params)
    .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
    .join("&");
  return `https://accounts.spotify.com/authorize?${queryString}`;
};
