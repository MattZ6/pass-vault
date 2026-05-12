import { View, type ViewProps } from "react-native";

import { useStyles } from "@/hooks/use-styles";

import { SectionItemLeadingIcon } from "./components/icon";

import { getStyles } from "./styles";

type Props = ViewProps;

export function SectionItemLeading({ style, ...props }: Props) {
  const { styles } = useStyles(getStyles);

  return <View {...props} style={[styles.leading, style]} />;
}

SectionItemLeading.Icon = SectionItemLeadingIcon;
