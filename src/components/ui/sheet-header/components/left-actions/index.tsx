import { View } from "react-native";

import { useStyles } from "@/hooks/use-styles";

import { SheetHeaderLeftActionsButton } from "./components/button/index";

import { getStyles } from "./styles";

import type { SheetHeaderLeftActionsProps } from "./types";

export function SheetHeaderLeftActions(props: SheetHeaderLeftActionsProps) {
  const { styles } = useStyles(getStyles);

  return <View style={styles.container} {...props} />;
}

SheetHeaderLeftActions.Button = SheetHeaderLeftActionsButton;
