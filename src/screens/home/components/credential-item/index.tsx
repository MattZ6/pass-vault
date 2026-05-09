import { Link } from "expo-router";
import { SymbolView } from "expo-symbols";
import { Platform, View } from "react-native";
import { Pressable } from "react-native-gesture-handler";

import { Text } from "@/components/ui/text";

import { useHaptics } from "@/hooks/use-haptics";
import { useStyles } from "@/hooks/use-styles";

import type { CredentialMeta } from "@/store/credentials/slices/meta.slice";

import { getStyles } from "./styles";

type Props = {
  credential: CredentialMeta;
};

export function CredentialItem({ credential }: Props) {
  const { performTapFeedback } = useHaptics();
  const { styles, theme } = useStyles(getStyles, {
    cacheKey: "credential-item",
  });

  return (
    <View style={styles.wrapper}>
      <Link href={`/credentials/${credential.id}`} asChild>
        <Pressable
          android_disableSound
          android_ripple={theme.colors.androidRipple}
          onPress={performTapFeedback}
        >
          <View style={styles.button}>
            <View style={styles.iconContainer}>
              <Text weight="bold" typography="title" color="muted">
                {credential.provider[0].toUpperCase()}
              </Text>
            </View>

            <View style={styles.content}>
              <Text numberOfLines={1} weight="medium">
                {credential.provider}
              </Text>
              <Text typography="bodySmall" color="muted" numberOfLines={1}>
                {credential.username}
              </Text>
            </View>

            <SymbolView
              name={{ android: "chevron_right", ios: "chevron.right" }}
              tintColor={theme.colors.content.muted}
              size={Platform.select({
                ios: 14,
                default: 24,
              })}
            />
          </View>
        </Pressable>
      </Link>
    </View>
  );
}
