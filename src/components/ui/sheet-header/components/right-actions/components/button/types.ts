import type { AndroidSymbol, SFSymbol } from "expo-symbols";

import type { IconButtonProps } from "@/components/ui/icon-button";

export type SheetHeaderRightActionsButtonProps = Pick<
  IconButtonProps,
  "hitSlop" | "accessibilityLabel" | "accessibilityLanguage"
> & {
  androidIcon: AndroidSymbol;
  iosIcon: SFSymbol;
  onPress: () => void;
};
