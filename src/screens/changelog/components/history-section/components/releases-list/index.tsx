import { Link } from "expo-router";
import { Fragment } from "react/jsx-runtime";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Text } from "@/components/ui/text";

import { useHaptics } from "@/hooks/use-haptics";
import { useStyles } from "@/hooks/use-styles";

import { getStyles } from "./styles";

type Release = {
  tag: string;
  label?: string;
  title: string;
  excerpt: string;
};

type Props = {
  releases: Release[];
};

export function ReleasesList({ releases }: Props) {
  const { styles } = useStyles(getStyles);
  const { performTapFeedback } = useHaptics();

  return (
    <Card color="element">
      {releases.map((item, index) => (
        <Fragment key={item.tag}>
          {index !== 0 && <Section.Divider style={styles.divider} />}

          <Link asChild href={`/settings/changelog/${item.tag}`}>
            <Button onPress={performTapFeedback}>
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
          </Link>
        </Fragment>
      ))}
    </Card>
  );
}
