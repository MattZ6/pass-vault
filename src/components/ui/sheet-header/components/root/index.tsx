import { View } from "react-native";

import { useStyles } from "@/hooks/use-styles";

import { getStyles } from "./styles";

import type { SheetHeaderRootProps } from "./types";

export function SheetHeaderRoot(props: SheetHeaderRootProps) {
  const { styles } = useStyles(getStyles);

  return <View style={styles.toolbar} {...props} />;
}
