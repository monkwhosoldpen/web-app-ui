import axios from "axios";

import { DEFAULT_AVATAR_PIC } from "design-system/avatar/constants";

export { default } from "app/pages/creator-channels";

export async function getServerSideProps(context) {
  const { channelId } = context.params;
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/channels/${channelId}`
    );
    const username = data.owner?.username || data.owner?.name;
    const imageUrl = (data.owner?.img_url ? data.owner?.img_url[0] : '') || DEFAULT_AVATAR_PIC;
    const image = imageUrl;

    return {
      props: {
        meta: {
          title: `GoatsConnect - Group`,
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
