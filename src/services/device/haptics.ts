import { Platform } from "react-native";
import { Presets } from "react-native-pulsar";

export const HapticsService = {
  performTapFeedback: () => {
    const play = Platform.select({
      android: Presets.System.Android.keyboardPress,
      default: Presets.System.selection,
    });

    play();
  },
  performSelectFeedback: () => {
    const play = Platform.select({
      android: Presets.System.Android.keyboardPress,
      default: Presets.System.selection,
    });

    play();
  },
  performImpactFeedback: () => {
    Presets.System.impactHeavy();
  },
  performSuccessNotificationFeedback: () => {
    Presets.System.notificationSuccess();
  },
  performFailureNotificationFeedback: () => {
    Presets.System.notificationError();
  },
};
