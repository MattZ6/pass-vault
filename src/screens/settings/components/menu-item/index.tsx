import { Link, type LinkProps } from "expo-router";
import type { SymbolViewProps } from "expo-symbols";

import { Button } from "@/components/ui/button/index";
import { Section } from "@/components/ui/section";

import { useHaptics } from "@/hooks/use-haptics";

type Props = {
  leadingIcon: SymbolViewProps["name"];
  title: string;
  href: LinkProps["href"];
};

export function MenuItem({ title, leadingIcon, href }: Props) {
  const { performTapFeedback } = useHaptics();

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

          <Section.Item.Trailing>
            <Section.Item.Trailing.Icon />
          </Section.Item.Trailing>
        </Section.Item.Root>
      </Button>
    </Link>
  );
}
