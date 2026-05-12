import { Stack } from "expo-router";

import type { SheetHeaderLeftActionsButtonProps } from "./types";

export function SheetHeaderLeftActionsButton(
  props: SheetHeaderLeftActionsButtonProps,
) {
  return (
    <Stack.Toolbar.Button
      accessibilityLabel={props.accessibilityLabel}
      onPress={props.onPress}
    >
      <Stack.Toolbar.Icon sf={props.iosIcon} />
    </Stack.Toolbar.Button>
  );
}
