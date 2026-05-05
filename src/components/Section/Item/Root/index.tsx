import type { ReactNode } from "react";

import { useTheme } from "@/hooks/use-theme";

import { View } from "@/lib/View";

import { SectionItemRootStyles as Styles } from "./styles";

export type SectionItemRootProps = {
  children: ReactNode;
};

export function SectionItemRoot(props: SectionItemRootProps) {
  const { theme } = useTheme();
  const styles = Styles.stylesheet(theme);

  return <View {...props} style={styles.container} />;
}
