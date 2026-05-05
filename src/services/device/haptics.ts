import * as ExpoHaptics from "expo-haptics";

export const HapticsService = {
  performTapFeedback: () => {
    ExpoHaptics.selectionAsync();
  },
  performSelectFeedback: () => {
    ExpoHaptics.selectionAsync();
  },
  performSuccessNotificationFeedback: () => {
    ExpoHaptics.notificationAsync(ExpoHaptics.NotificationFeedbackType.Success);
  },
  performFailureNotificationFeedback: () => {
    ExpoHaptics.notificationAsync(ExpoHaptics.NotificationFeedbackType.Error);
  },
};
