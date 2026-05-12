import { View, type ViewProps } from "react-native";

import { useStyles } from "@/hooks/use-styles";

import { SectionItemTrailingIcon } from "./components/icon";

import { getStyles } from "./styles";

type Props = ViewProps;

export function SectionItemTrailing({ style, ...props }: Props) {
  const { styles } = useStyles(getStyles);

  return <View {...props} style={[styles.trailing, style]} />;
}

SectionItemTrailing.Icon = SectionItemTrailingIcon;
