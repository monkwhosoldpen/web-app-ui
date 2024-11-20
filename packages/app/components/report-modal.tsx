import { useCallback, useEffect, useState, memo } from "react";

import { Accordion } from "@showtime-xyz/universal.accordion";
import { Button } from "@showtime-xyz/universal.button";
import { Fieldset } from "@showtime-xyz/universal.fieldset";
import { useIsDarkMode } from "@showtime-xyz/universal.hooks";
import { ChevronRight } from "@showtime-xyz/universal.icon";
import { Pressable } from "@showtime-xyz/universal.pressable";
import { useRouter } from "@showtime-xyz/universal.router";
import { colors } from "@showtime-xyz/universal.tailwind";
import { Text } from "@showtime-xyz/universal.text";
import { View } from "@showtime-xyz/universal.view";
import { useMyInfo } from "app/hooks/api-hooks";

import { useReport } from "app/hooks/use-report";
import { createParam } from "app/navigation/use-param";

type Query = {
  nftId: string;
  userId: string;
  channelMessageId?: number;
};

const { useParam } = createParam<Query>();
const NFT_REPORT_LIST = [
  "I just don't like it",
  "It's spam",
  "Not safe for work",
  "Scam or fraud",
  "It's not original content",
];
const PROFILE_REPORT_LIST = ["They are pretending to be someone else"];
const CHANNEL_MESSAGE_REPORT_LIST = ["This is a spam message"];

export const ReportModal = () => {
  const router = useRouter();
  const { report } = useReport();
  const isDark = useIsDarkMode();
  const [nftId] = useParam("nftId");
  const [userId] = useParam("userId");
  const [channelMessageId] = useParam("channelMessageId", {
    parse: (value) => Number(value),
    initial: undefined,
  });
  const [description, setDescription] = useState("");
  const reportOption = nftId
    ? NFT_REPORT_LIST
    : typeof channelMessageId !== "undefined"
      ? CHANNEL_MESSAGE_REPORT_LIST
      : PROFILE_REPORT_LIST;

  const handleSubmit = async (description: string) => {
    await report({
      nftId,
      userId,
      description,
      channelMessageId,
    });
    router.pop();
  };

  const { refetchMyInfo, data: myInfoData } = useMyInfo();

  const [statusUser, setStatusUser] = useState<any>(null);

  useEffect(() => {
    console.log(myInfoData);
    const statusUser_ = myInfoData
      ? myInfoData?.data?.profile?.is_anonymous
        ? "Anonymous"
        : "Non Anonymous"
      : "NOT Logged In";
    setStatusUser(statusUser_);
  }, [myInfoData]);

  return (
    <View>
      <Text>{statusUser}</Text>
    </View>
  );
};
