import { View, type ViewProps } from "react-native";

import { useStyles } from "@/hooks/use-styles";

import { SectionItemContentTitle } from "./components/title";

import { getStyles } from "./styles";

type Props = ViewProps;

export function SectionItemContent({ style, ...props }: Props) {
  const { styles } = useStyles(getStyles);

  return <View {...props} style={[styles.container, style]} />;
}

SectionItemContent.Title = SectionItemContentTitle;
