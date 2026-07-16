import { Stack } from "expo-router";

import type { SheetHeaderRightActionsButtonProps } from "./types";

export function SheetHeaderRightActionsButton(
  props: SheetHeaderRightActionsButtonProps,
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
