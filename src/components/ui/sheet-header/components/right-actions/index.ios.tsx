import { Stack } from "expo-router";
import { Children, isValidElement } from "react";

import { SheetHeaderRightActionsButton } from "./components/button";
import type { SheetHeaderRightActionsButtonProps } from "./components/button/types";

import type { SheetHeaderRightActionsProps } from "./types";

export function SheetHeaderRightActions({
  children,
}: SheetHeaderRightActionsProps) {
  return (
    <Stack.Toolbar placement="right">
      {Children.map(children, (child) => {
        if (!isValidElement<SheetHeaderRightActionsButtonProps>(child)) {
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

SheetHeaderRightActions.Button = SheetHeaderRightActionsButton;
