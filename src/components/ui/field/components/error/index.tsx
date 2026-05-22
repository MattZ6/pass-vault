import { View, type ViewProps } from "react-native";

import { useStyles } from "@/hooks/use-styles";

import { FieldErrorText } from "./components/text";

import { getStyles } from "./styles";

type Props = ViewProps;

export function FieldError({ style, ...props }: Props) {
  const { styles } = useStyles(getStyles);

  return <View {...props} style={[styles.container, style]} />;
}

FieldError.Text = FieldErrorText;
