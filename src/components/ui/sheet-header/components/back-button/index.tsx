import { useRouter } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useCallback } from "react";
import { View } from "react-native";

import { IconButton } from "@/components/ui/icon-button";

import { useHaptics } from "@/hooks/use-haptics";
import { useStyles } from "@/hooks/use-styles";

import { getStyles } from "./styles";

export function SheetHeaderBackButton() {
  const router = useRouter();
  const { performTapFeedback } = useHaptics();
  const { styles, theme } = useStyles(getStyles);

  const handleBack = useCallback(() => {
    performTapFeedback();

    if (router.canGoBack()) {
      router.back();
    }
  }, [router.canGoBack, router.back, performTapFeedback]);

  return (
    <View style={styles.wrapper}>
      <IconButton
        size={12}
        hitSlop={{
          left: theme.spacing[1],
          top: theme.spacing[6],
          bottom: theme.spacing[6],
          right: theme.spacing[4],
        }}
        onPress={handleBack}
      >
        <SymbolView
          name={{ android: "arrow_back", ios: "chevron.backward" }}
          tintColor={theme.colors.content.muted}
        />
      </IconButton>
    </View>
  );
}
