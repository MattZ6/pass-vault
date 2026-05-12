import { View, type ViewProps } from "react-native";

import { useStyles } from "@/hooks/use-styles";

import { getStyles } from "./styles";

type Props = ViewProps;

export function SectionDivider({ style, ...props }: Props) {
  const { styles } = useStyles(getStyles);

  return <View {...props} style={[styles.divider, style]} />;
}
