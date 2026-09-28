import { Alert, Button as SwiftUIButton, Host } from "@expo/ui/swift-ui";
import { useCallback } from "react";
import { View } from "react-native";

import { useHaptics } from "@/hooks/use-haptics";
import { useTheme } from "@/hooks/use-theme";

type Props = {
  isOpen: boolean;
  title: string;
  description?: string;
  confirmLabel: string;
  cancelLabel?: string;
  destructive?: boolean;
  onConfirm: () => void;
  onCancel?: () => void;
};

export function Dialog({
  isOpen,
  title,
  description,
  destructive,
  cancelLabel,
  onCancel,
  confirmLabel,
  onConfirm,
}: Props) {
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

  // SwiftUI's alert() modifier attaches to an anchor view rather than
  // mounting on demand, so the trigger stays in the tree as an invisible
  // 0x0 view and `isPresented` alone drives visibility.
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
          <View />
        </Alert.Trigger>

        {description && <Alert.Message>{description}</Alert.Message>}

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
