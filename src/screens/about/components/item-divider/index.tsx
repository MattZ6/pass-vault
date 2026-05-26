import { Section } from "@/components/ui/section";

import { useTheme } from "@/hooks/use-theme";

export function ItemDivider() {
  const { theme } = useTheme();

  return <Section.Divider style={{ marginLeft: theme.spacing[4] }} />;
}
