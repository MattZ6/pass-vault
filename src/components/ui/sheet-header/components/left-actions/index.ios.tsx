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
        if (!isValidElement<SheetHeaderLeftActionsButtonProps>(child)) {
          return child;
        }

        const { accessibilityLabel, onPress, iosIcon } = child.props;

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
