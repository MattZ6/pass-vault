import { Stack } from "expo-router";

import { SheetHeaderLeftActionsButton } from "./components/button/index";

import type { SheetHeaderLeftActionsProps } from "./types";

export function SheetHeaderLeftActions(props: SheetHeaderLeftActionsProps) {
  return <Stack.Toolbar placement="left" {...props} />;
}

SheetHeaderLeftActions.Button = SheetHeaderLeftActionsButton;
