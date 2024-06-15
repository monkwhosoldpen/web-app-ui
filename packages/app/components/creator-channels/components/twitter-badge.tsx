import { LeanText, LeanView } from "./lean-text";

export const TwitterBadge = () => {
  return (
    <LeanView tw="rounded-md bg-[#1DA1F2] px-2 py-1.5">
      <LeanView tw="flex-row items-center justify-center">
        <LeanText
          tw="text-xs font-medium text-white"
          style={{ lineHeight: 14 }}
        >
          Twitter
        </LeanText>
      </LeanView>
    </LeanView>
  );
};
