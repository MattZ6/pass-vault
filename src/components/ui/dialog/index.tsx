import { AlertDialog, Host, Text, TextButton } from "@expo/ui/jetpack-compose";
import type { AndroidSymbol, SFSymbol } from "expo-symbols";
import { useCallback } from "react";

import { useHaptics } from "@/hooks/use-haptics";
import { useTheme } from "@/hooks/use-theme";

export type DialogIcon = {
  ios?: SFSymbol;
  android?: AndroidSymbol;
};

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
  const { theme, resolvedThemeOption } = useTheme();
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
      {isOpen && (
        <AlertDialog
          onDismissRequest={onCancel}
          colors={{
            containerColor: theme.colors.surface.elevated,
            titleContentColor: theme.colors.content.base,
            textContentColor: theme.colors.content.muted,
          }}
        >
          <AlertDialog.Title>
            <Text
              style={{
                fontFamily: theme.fontFamily.medium,
                fontSize: theme.fontSize[3],
                lineHeight: theme.lineHeight[3],
              }}
            >
              {title}
            </Text>
          </AlertDialog.Title>

          {description && (
            <AlertDialog.Text>
              <Text
                style={{
                  fontFamily: theme.fontFamily.regular,
                  fontSize: theme.fontSize[2],
                  lineHeight: theme.lineHeight[2],
                }}
              >
                {description}
              </Text>
            </AlertDialog.Text>
          )}

          {cancelLabel && (
            <AlertDialog.DismissButton>
              <TextButton
                onClick={handleCancel}
                colors={{
                  contentColor: theme.colors.content.base,
                }}
              >
                <Text
                  style={{
                    fontFamily: theme.fontFamily.medium,
                    fontSize: theme.fontSize[3],
                    lineHeight: theme.lineHeight[3],
                    textAlign: "center",
                  }}
                >
                  {cancelLabel}
                </Text>
              </TextButton>
            </AlertDialog.DismissButton>
          )}

          <AlertDialog.ConfirmButton>
            <TextButton
              onClick={handleConfirm}
              colors={{
                contentColor: destructive
                  ? theme.colors.content.error
                  : theme.colors.content.base,
              }}
            >
              <Text
                style={{
                  fontFamily: theme.fontFamily.medium,
                  fontSize: theme.fontSize[3],
                  lineHeight: theme.lineHeight[3],
                  textAlign: "center",
                }}
              >
                {confirmLabel}
              </Text>
            </TextButton>
          </AlertDialog.ConfirmButton>
        </AlertDialog>
      )}
    </Host>
  );
}
