import { useCallback } from "react";

import { HapticsService } from "@/services/device/haptics";

import { usePreferences } from "./use-preferences";

export function useHaptics() {
  const { hapticsEnabled } = usePreferences();

  const performTapFeedback = useCallback(() => {
    if (!hapticsEnabled) {
      return;
    }

    HapticsService.performTapFeedback();
  }, [hapticsEnabled]);

  const performSelectFeedback = useCallback(() => {
    if (!hapticsEnabled) {
      return;
    }

    HapticsService.performSelectFeedback();
  }, [hapticsEnabled]);

  const performImpactFeedback = useCallback(() => {
    if (!hapticsEnabled) {
      return;
    }

    HapticsService.performImpactFeedback();
  }, [hapticsEnabled]);

  const notifySuccess = useCallback(() => {
    if (!hapticsEnabled) {
      return;
    }

    HapticsService.performSuccessNotificationFeedback();
  }, [hapticsEnabled]);

  const notifyFailure = useCallback(() => {
    if (!hapticsEnabled) {
      return;
    }

    HapticsService.performFailureNotificationFeedback();
  }, [hapticsEnabled]);

  return {
    performTapFeedback,
    performSelectFeedback,
    performImpactFeedback,
    notifySuccess,
    notifyFailure,
  };
}
