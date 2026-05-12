import { View, type ViewProps } from "react-native";

import { useStyles } from "@/hooks/use-styles";

import { type CardStyledOptions, getStyles } from "./styles";

type Props = ViewProps & Partial<CardStyledOptions>;

export function Card({ style, color = "elevated", ...props }: Props) {
  const { styles } = useStyles((input) => getStyles(input, { color }));

  return <View {...props} style={[styles.card, style]} />;
}
