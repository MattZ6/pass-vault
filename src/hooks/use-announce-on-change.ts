import { useEffect } from "react";
import { AccessibilityInfo } from "react-native";

// Screen readers don't notice text that appears elsewhere on screen on its
// own (that's what accessibilityLiveRegion is for on Android), but iOS has
// no equivalent prop, so this announces the message imperatively there too.
// Pair with accessibilityLiveRegion="polite" on the element itself.
export function useAnnounceOnChange(message: string | undefined) {
  useEffect(() => {
    if (message) {
      AccessibilityInfo.announceForAccessibility(message);
    }
  }, [message]);
}
