import { Stack } from "expo-router";

import { SheetHeaderRightActionsButton } from "./components/button/index";

import type { SheetHeaderRightActionsProps } from "./types";

export function SheetHeaderRightActions(props: SheetHeaderRightActionsProps) {
  return <Stack.Toolbar placement="right" {...props} />;
}

SheetHeaderRightActions.Button = SheetHeaderRightActionsButton;
