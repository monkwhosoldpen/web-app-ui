import axios from "axios";

import type { UserType } from "app/types";
import { formatAddressShort } from "app/utilities";

export async function getServerSideProps(context) {
  const username = context.params.username;

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/v4/profile_server/${username}`
    );
    const fallback = {
      [`/api/v4/profile_server/${username}`]: res.data,
    };

    const user = res.data as UserType;
    let title;
    if (user.data.profile.username && user.data.profile.name) {
      title = `${user.data.profile.name} (@${user.data.profile.username})`;
    } else if (user.data.profile.name) {
      title = user.data.profile.name;
    } else if (user.data.profile.username) {
      title = user.data.profile.username;
    }
    title += " | GoatsConnect";

    if (user) {
      let meta: any = {
        title,
        description: "Description",
        image: user.data.profile.img_url,
      };
      return {
        props: {
          fallback,
          meta,
        },
      };
    }
  } catch (e) {
    console.error(e);
  }

  return {
    props: {},
  };
}

export { default } from "app/pages/profile";
