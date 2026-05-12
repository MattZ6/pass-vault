import { Text } from "@/components/ui/text";

import { useStyles } from "@/hooks/use-styles";

import { getStyles } from "./styles";

import type { SheetHeaderTitleProps } from "./types";

export function SheetHeaderTitle(props: SheetHeaderTitleProps) {
  const { styles } = useStyles(getStyles);

  return (
    <Text
      weight="semiBold"
      typography="subtitle"
      numberOfLines={1}
      style={styles.title}
      {...props}
    />
  );
}
