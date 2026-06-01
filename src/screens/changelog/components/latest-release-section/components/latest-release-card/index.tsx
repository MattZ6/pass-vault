import { Link } from "expo-router";
import { SymbolView } from "expo-symbols";
import { View } from "react-native";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";

import { useHaptics } from "@/hooks/use-haptics";
import { useLanguage } from "@/hooks/use-language";
import { useStyles } from "@/hooks/use-styles";

import { useChangelogStore } from "@/store/changelog/changelog.store";

import { DateUtils } from "@/utils/date";

import { getStyles } from "./styles";

type LatestRelease = {
  tag: string;
  label?: string;
  title: string;
  excerpt: string;
  date: Date;
};

type Props = {
  release: LatestRelease;
};

const now = new Date();

export function LatestReleaseCard({ release }: Props) {
  const { language } = useLanguage();
  const { styles, theme } = useStyles(getStyles);
  const { performTapFeedback } = useHaptics();
  const hasUnreadVersion = useChangelogStore((s) => s.hasUnreadVersion);

  const releaseDate = DateUtils.formatDate(release.date, {
    language,
    hideYear: now.getFullYear() === release.date.getFullYear(),
  });

  return (
    <Card color="element">
      <Link asChild href={`/settings/changelog/${release.tag}`}>
        <Button onPress={performTapFeedback}>
          <View style={styles.content}>
            <View style={styles.header}>
              <View style={styles.left}>
                <SymbolView
                  tintColor={theme.colors.content.base}
                  name={{ android: "auto_awesome" }}
                  size={16}
                />
                <Text typography="bodySmall" color="muted">
                  {release.label ?? release.tag}
                </Text>

                {hasUnreadVersion && <View style={styles.newVersionDot} />}
              </View>

              <Text typography="bodySmall" color="muted" style={styles.date}>
                {releaseDate}
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
