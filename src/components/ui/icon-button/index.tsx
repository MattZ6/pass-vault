import type { ReactNode } from "react";
import { Pressable, type PressableProps, View } from "react-native";

import { useStyles } from "@/hooks/use-styles";

import { getStyles, type IconButtonStyledOptions } from "./styles";

export type IconButtonProps = Omit<
  PressableProps,
  "android_disableSound" | "android_ripple" | "style"
> &
  Partial<IconButtonStyledOptions>;

export function IconButton({
  children,
  size = 12,
  accessibilityRole = "button",
  ...props
}: IconButtonProps) {
  const { styles, theme } = useStyles((input) => getStyles(input, { size }));

  return (
    <View style={styles.wrapper}>
      <Pressable
        android_disableSound
        android_ripple={theme.colors.androidRipple}
        {...props}
        accessibilityRole={accessibilityRole}
      >
        <View style={styles.content}>{children as ReactNode}</View>
      </Pressable>
    </View>
  );
}
