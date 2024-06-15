import { LeanText, LeanView } from "./lean-text";

export const ZulipBadge = () => {
  return (
    <LeanView tw="rounded-md bg-[#007ACC] px-2 py-1.5">
      <LeanView tw="flex-row items-center justify-center">
        <LeanText
          tw="text-xs font-medium text-white"
          style={{
            lineHeight: 14,
            color: ""
          }}
        >
          N
        </LeanText>
      </LeanView>
    </LeanView>
  );
};
