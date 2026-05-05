import { useTheme } from "@/hooks/use-theme";

import { Text } from "@/lib/Text";

import { SectionItemValueStyles as Styles } from "./styles";

export type SectionItemValueProps = {
  children: string;
};

export function SectionItemValue(props: SectionItemValueProps) {
  const { theme } = useTheme();
  const styles = Styles.stylesheet(theme);

  return <Text {...props} style={styles.value} />;
}
