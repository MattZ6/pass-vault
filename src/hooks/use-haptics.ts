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

  const performDragFeedback = useCallback(() => {
    if (!hapticsEnabled) {
      return;
    }

    HapticsService.performDragFeedback();
  }, [hapticsEnabled]);

  const performReleaseFeedback = useCallback(() => {
    if (!hapticsEnabled) {
      return;
    }

    HapticsService.performReleaseFeedback();
  }, [hapticsEnabled]);

  const performImpactFeedback = useCallback(() => {
    if (!hapticsEnabled) {
      return;
    }

    HapticsService.performImpactFeedback();
  }, [hapticsEnabled]);

  const performConfirmFeedback = useCallback(() => {
    if (!hapticsEnabled) {
      return;
    }

    HapticsService.performConfirmFeedback();
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
    performDragFeedback,
    performReleaseFeedback,
    performImpactFeedback,
    performConfirmFeedback,
    notifySuccess,
    notifyFailure,
  };
}
