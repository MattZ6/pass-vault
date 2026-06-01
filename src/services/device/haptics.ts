import * as Pulsar from "react-native-pulsar";

export const HapticsService = {
  performTapFeedback: () => {
    Pulsar.Presets.System.selection();
  },
  performSelectFeedback: () => {
    Pulsar.Presets.System.selection();
  },
  performSuccessNotificationFeedback: () => {
    Pulsar.Presets.System.notificationSuccess();
  },
  performFailureNotificationFeedback: () => {
    Pulsar.Presets.System.notificationError();
  },
};
