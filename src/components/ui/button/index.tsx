import { Pressable } from "react-native";

import { useTheme } from "@/hooks/use-theme";

import type { ButtonProps } from "./types";

export function Button({ children, ...props }: ButtonProps) {
  const { theme } = useTheme();

  return (
    <Pressable
      {...props}
      android_disableSound
      android_ripple={theme.colors.androidRipple}
    >
      {children}
    </Pressable>
  );
}
