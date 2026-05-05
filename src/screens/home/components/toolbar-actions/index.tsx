import { Link, Stack } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { type Insets, View } from "react-native";

import { IconButton } from "@/components/ui/icon-button";

import { useHaptics } from "@/hooks/use-haptics";
import { useStyles } from "@/hooks/use-styles";

import { getStyles } from "./styles";

export function ToolbarActions() {
  const { t } = useTranslation("home", { keyPrefix: "toolbar.actions" });
  const { styles, theme } = useStyles(getStyles);
  const { performTapFeedback } = useHaptics();

  const hitSlop = useMemo(() => {
    const leftButton: Insets = {
      top: theme.spacing["4"],
      left: theme.spacing["4"],
      bottom: theme.spacing["4"],
    };
    const rightButton: Insets = {
      right: theme.spacing["2"],
      top: theme.spacing["4"],
      bottom: theme.spacing["4"],
    };

    return {
      leftButton,
      rightButton,
    };
  }, [theme.spacing]);

  const handlePress = useCallback(
    () => performTapFeedback(),
    [performTapFeedback],
  );

  return (
    <Stack.Toolbar placement="right" asChild>
      <View style={styles.actionsContainer}>
        <Link href={{ pathname: "/credentials/new" }} asChild>
          <IconButton
            accessibilityLabel={t("add_credential.label")}
            hitSlop={hitSlop.leftButton}
            onPress={handlePress}
          >
            <SymbolView
              name={{ android: "add" }}
              tintColor={theme.colors.content.muted}
            />
          </IconButton>
        </Link>

        <Link href={{ pathname: "/settings" }} asChild>
          <IconButton
            accessibilityLabel={t("settings.label")}
            hitSlop={hitSlop.rightButton}
            onPress={handlePress}
          >
            <SymbolView
              name={{ android: "more_horiz" }}
              tintColor={theme.colors.content.muted}
            />
          </IconButton>
        </Link>
      </View>
    </Stack.Toolbar>
  );
}
