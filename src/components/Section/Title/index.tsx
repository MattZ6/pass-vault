import type { ReactNode } from "react";

import { useTheme } from "@/hooks/use-theme";

import { Text } from "@/lib/Text";

import { stylesheet } from "./styles";

export type SectionTitleProps = {
  children: ReactNode;
};

export function SectionTitle(props: SectionTitleProps) {
  const { theme } = useTheme();
  const styles = stylesheet(theme);

  return <Text {...props} style={styles.title} />;
}
