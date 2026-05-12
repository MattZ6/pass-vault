import type { PressableProps } from "react-native";
import type { SpringConfig } from "react-native-reanimated/lib/typescript/animation/spring";

export const IOS_SCALE_CONFIG = {
  PRESSED: 0.97,
  RELEASED: 1,
};

export const IOS_SPRINT_CONFIG: SpringConfig = { damping: 100 };

export type ButtonProps = Omit<
  PressableProps,
  | "android_disableSound"
  | "android_ripple"
  | "style"
  | "onPressIn"
  | "onPressOut"
> & {
  children: React.ReactNode;
  iosPressedScale?: number;
  ioSpringConfig?: SpringConfig;
};
