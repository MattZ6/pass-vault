import { Text, type TextProps } from "@/components/ui/text";

type Props = TextProps;

export function SectionTitle({ style, ...props }: Props) {
  return <Text weight="medium" typography="body" color="muted" {...props} />;
}
