import { SymbolView } from "expo-symbols";

import { IconButton } from "@/components/ui/icon-button";

import { useTheme } from "@/hooks/use-theme";

import type { SheetHeaderRightActionsButtonProps } from "./types";

export function SheetHeaderRightActionsButton({
  androidIcon,
  ...props
}: SheetHeaderRightActionsButtonProps) {
  const { theme } = useTheme();

  return (
    <IconButton {...props}>
      <SymbolView
        name={{ android: androidIcon }}
        tintColor={theme.colors.content.muted}
      />
    </IconButton>
  );
}
