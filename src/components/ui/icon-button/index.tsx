import type { ReactNode } from "react";
import { Pressable, type PressableProps, View } from "react-native";

import { useStyles } from "@/hooks/use-styles";

import { getStyles, type IconButtonStyledOptions } from "./styles";

type Props = Omit<
  PressableProps,
  "android_disableSound" | "android_ripple" | "style"
> &
  Partial<IconButtonStyledOptions>;

export function IconButton({ children, size = 11, ...props }: Props) {
  const { styles, theme } = useStyles((input) => getStyles(input, { size }));

  return (
    <View style={styles.wrapper}>
      <Pressable
        android_disableSound
        android_ripple={theme.colors.androidRipple}
        {...props}
      >
        <View style={styles.content}>{children as ReactNode}</View>
      </Pressable>
    </View>
  );
}
