import { Alert, Host, Button as SwiftUIButton, Text as SwiftUIText } from "@expo/ui/swift-ui";
import { useCallback } from "react";

import { useHaptics } from "@/hooks/use-haptics";
import { useTheme } from "@/hooks/use-theme";

import type { DialogProps } from "./types";

export function Dialog({
  isOpen,
  title,
  description,
  destructive,
  cancelLabel,
  onCancel,
  confirmLabel,
  onConfirm,
}: DialogProps) {
  const { resolvedThemeOption } = useTheme();
  const { performTapFeedback } = useHaptics();

  const handleCancel = useCallback(() => {
    performTapFeedback();

    if (onCancel) {
      onCancel();
    }
  }, [performTapFeedback, onCancel]);

  const handleConfirm = useCallback(() => {
    performTapFeedback();

    if (onConfirm) {
      onConfirm();
    }
  }, [performTapFeedback, onConfirm]);

  return (
    <Host matchContents colorScheme={resolvedThemeOption}>
      <Alert
        title={title}
        isPresented={isOpen}
        onIsPresentedChange={(presented) => {
          if (!presented) {
            handleCancel();
          }
        }}
      >
        <Alert.Trigger>
          <SwiftUIButton
            onPress={() => { }}
          />
        </Alert.Trigger>

        {description && (
          <Alert.Message>
            <SwiftUIText>{description}</SwiftUIText>
          </Alert.Message>
        )}

        <Alert.Actions>
          {cancelLabel && (
            // biome-ignore lint/a11y/useValidAriaRole: `role` here is @expo/ui's native SwiftUI ButtonRole, not an ARIA role.
            <SwiftUIButton
              role="cancel"
              label={cancelLabel}
              onPress={handleCancel}
            />
          )}

          <SwiftUIButton
            role={destructive ? "destructive" : "default"}
            label={confirmLabel}
            onPress={handleConfirm}
          />
        </Alert.Actions>
      </Alert>
    </Host>
  );
}
