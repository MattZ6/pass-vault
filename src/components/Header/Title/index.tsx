import { useTheme } from "@/hooks/use-theme";

import { Text } from "@/lib/Text";

import { stylesheet } from "./styles";

export type HeaderTitleProps = {
  children: string;
};

export function HeaderTitle(props: HeaderTitleProps) {
  const { theme } = useTheme();
  const styles = stylesheet(theme);

  return <Text {...props} style={styles.title} />;
}
