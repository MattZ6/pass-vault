import { useTheme } from "@/hooks/use-theme";

import { Text } from "@/lib/Text";

import { SectionItemLabelStyles as Styles } from "./styles";

export type SectionItemLabelProps = {
  children: string;
};

export function SectionItemLabel(props: SectionItemLabelProps) {
  const { theme } = useTheme();
  const styles = Styles.stylesheet(theme);

  return <Text {...props} style={styles.label} />;
}
