import { View, type ViewProps } from "react-native";

import { useStyles } from "@/hooks/use-styles";

import { SectionTitle } from "./components/title";

import { getStyles } from "./styles";

type Props = ViewProps;

export function SectionHeader({ style, ...props }: Props) {
  const { styles } = useStyles(getStyles);

  return <View {...props} style={[styles.header, style]} />;
}

SectionHeader.Title = SectionTitle;
