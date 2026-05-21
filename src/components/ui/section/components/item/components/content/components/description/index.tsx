import { Text, type TextProps } from "@/components/ui/text";

type Props = TextProps;

export function SectionItemContentDescription(props: Props) {
  return (
    <Text typography="bodySmall" color="muted" numberOfLines={2} {...props} />
  );
}
