import { useObserve } from "expo-observe";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useStyles } from "@/hooks/use-styles";

import { DateUtils } from "@/utils/date";

import { AlphaReleasesSection } from "./components/alpha-releases-section";
import { HistorySection } from "./components/history-section";
import { LatestReleaseSection } from "./components/latest-release-section";
import { ScreenHeader } from "./components/screen-header";

import { getStyles } from "./styles";

type RawVersion = {
  label?: string;
  title: string;
  excerpt: string;
  date: string;
};

type VersionMetadata = {
  label?: string;
  title: string;
  excerpt: string;
  date: Date;
};

type VersionsMetadata = Record<string, RawVersion>;

type ParsedVersion = VersionMetadata & {
  tag: string;
};

export function ChangelogScreen() {
  const safeInsets = useSafeAreaInsets();
  const { styles, theme } = useStyles((input) => getStyles(input, safeInsets));
  const { t } = useTranslation("changelog", { keyPrefix: "changelog" });
  const { markInteractive } = useObserve();

  const { latestRelease, releases, alphaReleases } = useMemo(() => {
    const versionsMetadata = t("meta", {
      returnObjects: true,
    }) as VersionsMetadata;

    return Object.entries(versionsMetadata).reduce(
      (acc, [tag, meta]) => {
        const version: ParsedVersion = {
          tag,
          label: meta.label,
          title: meta.title,
          excerpt: meta.excerpt,
          date: DateUtils.toDate(meta.date),
        };

        if (!acc.latestRelease.tag) {
          acc.latestRelease = version;
        } else {
          if (tag.includes("alpha")) {
            acc.alphaReleases.push(version);
          } else {
            acc.releases.push(version);
          }
        }

        return acc;
      },
      {
        latestRelease: {} as ParsedVersion,
        releases: [] as ParsedVersion[],
        alphaReleases: [] as ParsedVersion[],
      },
    );
  }, [t]);

  useEffect(() => {
    markInteractive();
  }, [markInteractive]);

  return (
    <>
      <ScreenHeader />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.list}
        contentContainerStyle={styles.scrollContainer}
        fadingEdgeLength={{
          start: theme.size[2],
          end: theme.size[8],
        }}
      >
        <LatestReleaseSection release={latestRelease} />
        <HistorySection releases={releases} />
        <AlphaReleasesSection releases={alphaReleases} />
      </ScrollView>
    </>
  );
}
