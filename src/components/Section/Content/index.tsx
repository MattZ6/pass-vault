import type { ReactNode } from "react";

import { useTheme } from "@/hooks/use-theme";

import { View } from "@/lib/View";

import { stylesheet } from "./styles";

export type SectionContentProps = {
  children: ReactNode;
};

export function SectionContent(props: SectionContentProps) {
  const { theme } = useTheme();
  const styles = stylesheet(theme);

  return <View {...props} style={styles.container} />;
}
