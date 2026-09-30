import { View } from "react-native";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

import { useStyles } from "@/hooks/use-styles";

import { getStyles } from "./styles";

import type { SheetHeaderRightActionsTextButtonProps } from "./types";

export function SheetHeaderRightActionsTextButton({
  label,
  disabled,
  onPress,
}: SheetHeaderRightActionsTextButtonProps) {
  const { styles } = useStyles(getStyles);

  return (
    <View style={styles.wrapper}>
      <Button disabled={disabled} onPress={onPress}>
        <View style={styles.content}>
          <Text
            weight="medium"
            style={[styles.text, disabled && styles.textDisabled]}
          >
            {label}
          </Text>
        </View>
      </Button>
    </View>
  );
}
