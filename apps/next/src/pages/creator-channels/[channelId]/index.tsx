import axios from "axios";

import { DEFAULT_AVATAR_PIC } from "design-system/avatar/constants";

export { default } from "app/pages/creator-channels";

export async function getServerSideProps(context) {
  const { channelId } = context.params;
  console.log(channelId);


  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/channels/${channelId}`
    );
    const username = data.owner?.username || data.owner?.name;
    const imageUrl = data.owner?.img_url || DEFAULT_AVATAR_PIC;
    const image = `${__DEV__
      ? "http://localhost:3000"
      : `https://${process.env.NEXT_PUBLIC_WEBSITE_DOMAIN}`
      }/api/channels?username=${username}&image=${imageUrl}`;

    return {
      props: {
        meta: {
          title: `GoatsConnect - Creator Channel`,
          description: `Join @${username} channel on GoatsConnect!`,
          image,
          deeplinkUrl: `/groups/${channelId}`,
        },
      },
    };
  } catch (error) { }
  return {
    props: {},
  };
}
