import { useMemo } from "react";
import { Fragment } from "react/jsx-runtime";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";

import { useStyles } from "@/hooks/use-styles";

import { getStyles } from "./styles";

type RawVersion = {
  label: string;
  title: string;
  excerpt: string;
};

type RawVersionMap = Record<string, RawVersion>;

export function ReleasesList() {
  const { styles } = useStyles(getStyles);
  const { t } = useTranslation("changelog", {
    keyPrefix: "changelog.meta",
  });

  const versions = useMemo(() => {
    const rawVersionsMap = t("current", {
      returnObjects: true,
    }) as RawVersionMap;

    const [, ...versions] = Object.entries(rawVersionsMap).map(
      ([tag, rawVersion]) => {
        return {
          tag,
          title: rawVersion.title,
        };
      },
    );

    return versions;
  }, [t]);

  return (
    <Card color="element">
      {versions.map((item, index) => (
        <Fragment key={item.tag}>
          {index !== 0 && <Section.Divider style={styles.divider} />}

          <Button>
            <Section.Item.Root>
              <Section.Item.Leading style={styles.leading}>
                <Text
                  typography="bodySmall"
                  color="muted"
                  style={styles.version}
                >
                  {item.tag}
                </Text>
              </Section.Item.Leading>
              <Section.Item.Content>
                <Section.Item.Content.Title>
                  {item.title}
                </Section.Item.Content.Title>
              </Section.Item.Content>
              <Section.Item.Trailing style={styles.trailing}>
                <Section.Item.Trailing.Icon />
              </Section.Item.Trailing>
            </Section.Item.Root>
          </Button>
        </Fragment>
      ))}
    </Card>
  );
}
