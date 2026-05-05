import { useTheme } from "@/hooks/use-theme";

import { View } from "@/lib/View";

import { stylesheet } from "./styles";

export function SectionDivider() {
  const { theme } = useTheme();
  const styles = stylesheet(theme);

  return <View style={styles.divider} />;
}
