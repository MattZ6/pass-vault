import { View } from "react-native";

import { useStyles } from "@/hooks/use-styles";

import { getStyles } from "./styles";

export function ItemSeparator() {
  const { styles } = useStyles(getStyles, {
    cacheKey: "credential-item-separator",
  });

  return <View style={styles.separator} />;
}
