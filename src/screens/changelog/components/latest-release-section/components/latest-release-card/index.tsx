import { Link } from "expo-router";
import { SymbolView } from "expo-symbols";
import { View } from "react-native";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";

import { useHaptics } from "@/hooks/use-haptics";
import { useStyles } from "@/hooks/use-styles";

import { getStyles } from "./styles";

type LatestRelease = {
  tag: string;
  label?: string;
  title: string;
  excerpt: string;
};

type Props = {
  release: LatestRelease;
};

export function LatestReleaseCard({ release }: Props) {
  const { styles, theme } = useStyles(getStyles);
  const { performTapFeedback } = useHaptics();

  return (
    <Card color="element">
      <Link asChild href={`/settings/changelog/${release.tag}`}>
        <Button onPress={performTapFeedback}>
          <View style={styles.content}>
            <View style={styles.header}>
              <SymbolView
                tintColor={theme.colors.content.base}
                name={{ android: "auto_awesome" }}
                size={20}
              />
              <Text typography="bodySmall" color="muted">
                {release.label ?? release.tag}
              </Text>
            </View>

            <Text typography="body">{release.title}</Text>

            <Text color="muted" typography="bodySmall">
              {release.excerpt}
            </Text>
          </View>
        </Button>
      </Link>
    </Card>
  );
}
