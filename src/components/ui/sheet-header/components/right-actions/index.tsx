import { View } from "react-native";

import { useStyles } from "@/hooks/use-styles";

import { SheetHeaderRightActionsButton } from "./components/button/index";

import { getStyles } from "./styles";

import type { SheetHeaderRightActionsProps } from "./types";

export function SheetHeaderRightActions(props: SheetHeaderRightActionsProps) {
  const { styles } = useStyles(getStyles);

  return <View style={styles.container} {...props} />;
}

SheetHeaderRightActions.Button = SheetHeaderRightActionsButton;
