import { Stack } from "expo-router";
import { Children, isValidElement } from "react";
import { useTheme } from "@/hooks/use-theme";
import { SheetHeaderRightActionsButton } from "./components/button";
import type { SheetHeaderRightActionsButtonProps } from "./components/button/types";
import { SheetHeaderRightActionsTextButton } from "./components/text-button";
import type { SheetHeaderRightActionsTextButtonProps } from "./components/text-button/types";
import type { SheetHeaderRightActionsProps } from "./types";

export function SheetHeaderRightActions({
  children,
}: SheetHeaderRightActionsProps) {
  const { theme } = useTheme();

  return (
    <Stack.Toolbar placement="right">
      {Children.map(children, (child) => {
        if (!isValidElement(child)) {
          return child;
        }

        // Matched by exact element type, not just "is a valid element":
        // Stack.Toolbar only accepts its own marker components as direct
        // children (see left-actions/index.ios.tsx for the full reason),
        // so any other child passed through here — like this file's own
        // markers below — needs to be swapped for the real thing, while
        // anything else is left untouched.
        if (child.type === SheetHeaderRightActionsButton) {
          const { accessibilityLabel, onPress, iosIcon } =
            child.props as SheetHeaderRightActionsButtonProps;

          return (
            <Stack.Toolbar.Button
              accessibilityLabel={accessibilityLabel}
              onPress={onPress}
              tintColor={theme.colors.surface.element}
              style={{
                fontFamily: theme.fontFamily.medium,
                color: theme.colors.content.base,
              }}
            >
              <Stack.Toolbar.Icon sf={iosIcon} />
            </Stack.Toolbar.Button>
          );
        }

        if (child.type === SheetHeaderRightActionsTextButton) {
          const { label, disabled, onPress } =
            child.props as SheetHeaderRightActionsTextButtonProps;

          return (
            <Stack.Toolbar.Button
              variant="done"
              disabled={disabled}
              onPress={onPress}
              tintColor={theme.colors.surface.element}
              style={{
                fontFamily: theme.fontFamily.medium,
                color: theme.colors.content.base,
              }}
            >
              <Stack.Toolbar.Label>
                {label}
              </Stack.Toolbar.Label>
            </Stack.Toolbar.Button>
          );
        }

        return child;
      })}
    </Stack.Toolbar>
  );
}

SheetHeaderRightActions.Button = SheetHeaderRightActionsButton;
SheetHeaderRightActions.TextButton = SheetHeaderRightActionsTextButton;
