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
  performDragFeedback: () => {
    const play = Platform.select({
      android: Presets.System.Android.gestureStart,
      default: Presets.System.impactLight,
    });

    play();
  },
  performReleaseFeedback: () => {
    const play = Platform.select({
      android: Presets.System.Android.release,
      default: Presets.System.impactSoft,
    });

    play();
  },
  performImpactFeedback: () => {
    const play = Platform.select({
      android: Presets.System.Android.confirm,
      default: Presets.System.impactHeavy,
    });

    play();
  },
  performSuccessNotificationFeedback: () => {
    Presets.System.notificationSuccess();
  },
  performFailureNotificationFeedback: () => {
    Presets.System.notificationError();
  },
};
