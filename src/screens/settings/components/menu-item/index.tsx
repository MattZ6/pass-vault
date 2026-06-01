import { Link, type LinkProps } from "expo-router";
import type { SymbolViewProps } from "expo-symbols";
import { View } from "react-native";

import { Button } from "@/components/ui/button/index";
import { Section } from "@/components/ui/section";

import { useHaptics } from "@/hooks/use-haptics";
import { useStyles } from "@/hooks/use-styles";

import { getStyles } from "./styles";

type Props = {
  leadingIcon: SymbolViewProps["name"];
  title: string;
  href: LinkProps["href"];
  hasNews?: boolean;
};

export function MenuItem({ title, leadingIcon, href, hasNews }: Props) {
  const { performTapFeedback } = useHaptics();
  const { styles } = useStyles(getStyles);

  return (
    <Link href={href} asChild>
      <Button onPress={performTapFeedback}>
        <Section.Item.Root>
          <Section.Item.Leading>
            <Section.Item.Leading.Icon name={leadingIcon} />
          </Section.Item.Leading>

          <Section.Item.Content>
            <Section.Item.Content.Title>{title}</Section.Item.Content.Title>
          </Section.Item.Content>

          <Section.Item.Trailing style={styles.trailing}>
            {hasNews && <View style={styles.newsDot} />}
            <Section.Item.Trailing.Icon />
          </Section.Item.Trailing>
        </Section.Item.Root>
      </Button>
    </Link>
  );
}
