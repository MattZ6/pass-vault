import { useEffect, useRef } from "react";
import { Alert, type AlertButton } from "react-native";

import { useHaptics } from "@/hooks/use-haptics";

import type { DialogProps } from "./types";

// @expo/ui/swift-ui's Alert presents by attaching SwiftUI's .alert()
// modifier to an anchor view mounted wherever this component renders in
// the tree. ConfirmProvider mounts Dialog once at the app root, above
// react-native-screens' native-stack — outside any screen's own view
// controller — so the alert ends up presenting against the wrong
// (root) view controller instead of whatever screen is actually on
// screen. React Native's own Alert.alert is a plain imperative call: it
// always targets the current key window correctly regardless of where
// the calling code lives, and it's already backed by a real
// UIAlertController, so it doesn't cost anything in "native feel" for a
// dialog that has to be callable from anywhere in the app.
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
  const { performTapFeedback } = useHaptics();
  const wasOpenRef = useRef(isOpen);

  useEffect(() => {
    const wasOpen = wasOpenRef.current;
    wasOpenRef.current = isOpen;

    if (!isOpen || wasOpen) {
      return;
    }

    const buttons: AlertButton[] = [];

    if (cancelLabel) {
      buttons.push({
        text: cancelLabel,
        style: "cancel",
        onPress: () => {
          performTapFeedback();
          onCancel?.();
        },
      });
    }

    buttons.push({
      text: confirmLabel,
      style: destructive ? "destructive" : "default",
      onPress: () => {
        performTapFeedback();
        onConfirm();
      },
    });

    Alert.alert(title, description, buttons);
  }, [
    isOpen,
    title,
    description,
    cancelLabel,
    confirmLabel,
    destructive,
    onCancel,
    onConfirm,
    performTapFeedback,
  ]);

  return null;
}
