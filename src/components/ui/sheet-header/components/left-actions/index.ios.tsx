import { Stack } from "expo-router";
import { Children, isValidElement } from "react";

import { SheetHeaderLeftActionsButton } from "./components/button";
import type { SheetHeaderLeftActionsButtonProps } from "./components/button/types";

import type { SheetHeaderLeftActionsProps } from "./types";

export function SheetHeaderLeftActions({
  children,
}: SheetHeaderLeftActionsProps) {
  return (
    <Stack.Toolbar placement="left">
      {Children.map(children, (child) => {
        if (!isValidElement(child)) {
          return child;
        }

        // Matched by exact element type, not just "is a valid element" —
        // see right-actions/index.ios.tsx for why. Anything else (a
        // custom component that isn't this file's own marker) is left
        // untouched.
        if (child.type !== SheetHeaderLeftActionsButton) {
          return child;
        }

        const { accessibilityLabel, onPress, iosIcon } =
          child.props as SheetHeaderLeftActionsButtonProps;

        return (
          <Stack.Toolbar.Button
            accessibilityLabel={accessibilityLabel}
            onPress={onPress}
          >
            <Stack.Toolbar.Icon sf={iosIcon} />
          </Stack.Toolbar.Button>
        );
      })}
    </Stack.Toolbar>
  );
}

SheetHeaderLeftActions.Button = SheetHeaderLeftActionsButton;
