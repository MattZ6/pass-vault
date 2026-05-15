// import FeatherIcon from "@expo/vector-icons/Feather";
import { Link } from "expo-router";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";

import { useHaptics } from "@/hooks/use-haptics";
import { useStyles } from "@/hooks/use-styles";

import { getStyles } from "./styles";

export function EmptyState() {
  const { t } = useTranslation("home", { keyPrefix: "list.empty" });
  const { performTapFeedback } = useHaptics();
  const { styles, theme } = useStyles(getStyles);

  return (
    <Link href="/credentials/new" asChild>
      <Pressable
        android_disableSound
        android_ripple={theme.colors.androidRipple}
        style={styles.pressable}
        onPress={performTapFeedback}
      >
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            {/* <FeatherIcon
              name="key"
              size={48}
              color={theme.colors.content.muted}
            /> */}
          </View>
          <Text style={styles.title}>{t("title")}</Text>
          <Text style={styles.description}>{t("description")}</Text>
          <Text style={styles.hint}>{t("hint")}</Text>
        </View>
      </Pressable>
    </Link>
  );
}
