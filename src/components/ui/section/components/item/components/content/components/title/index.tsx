import { Text, type TextProps } from "@/components/ui/text";

type Props = TextProps;

export function SectionItemContentTitle(props: Props) {
  return <Text typography="body" numberOfLines={1} {...props} />;
}
