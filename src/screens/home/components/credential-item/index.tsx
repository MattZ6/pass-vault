import { Link } from "expo-router";
import { View } from "react-native";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";

import { useHaptics } from "@/hooks/use-haptics";
import { useStyles } from "@/hooks/use-styles";
import { useTheme } from "@/hooks/use-theme";

import type { CredentialMeta } from "@/store/credentials/slices/meta.slice";

import { getStyles } from "./styles";

type Props = {
  credential: CredentialMeta;
};

export function CredentialItem({ credential }: Props) {
  const { performTapFeedback } = useHaptics();
  const { resolvedThemeOption } = useTheme();
  const { styles } = useStyles(
    (input) => getStyles(input, resolvedThemeOption),
    { cacheKey: "credential-item" },
  );

  return (
    <View style={styles.wrapper}>
      <Link href={`/credentials/${credential.id}`} asChild>
        <Button onPress={performTapFeedback}>
          <Section.Item.Root style={styles.button}>
            <Section.Item.Leading style={styles.iconContainer}>
              <Text weight="medium" typography="title" color="muted">
                {credential.provider[0].toUpperCase()}
              </Text>
            </Section.Item.Leading>

            <Section.Item.Content>
              <Section.Item.Content.Title weight="medium">
                {credential.provider}
              </Section.Item.Content.Title>
              <Section.Item.Content.Description>
                {credential.username}
              </Section.Item.Content.Description>
            </Section.Item.Content>

            <Section.Item.Trailing>
              <Section.Item.Trailing.Icon />
            </Section.Item.Trailing>
          </Section.Item.Root>

          {/* <View style={styles.button}>
            <View style={styles.iconContainer}>
              <Text weight="medium" typography="title" color="element">
                {credential.provider[0].toUpperCase()}
              </Text>
            </View>

            <View style={styles.content}>
              <Text weight="medium" numberOfLines={1}>
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
          </View> */}
        </Button>
      </Link>
    </View>
  );
}
