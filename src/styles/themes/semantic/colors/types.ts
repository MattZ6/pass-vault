import type {
  OpaqueColorValue,
  PressableAndroidRippleConfig,
} from "react-native";

type AppColorValue = OpaqueColorValue | string;

type SurfaceColors = {
  base: AppColorValue;
  elevated: AppColorValue;
};

type ContentColors = {
  base: AppColorValue;
  muted: AppColorValue;
};

export type ContentColorsOptions = keyof ContentColors;

type Border = {
  default: AppColorValue;
};

export type Colors = {
  surface: SurfaceColors;
  content: ContentColors;
  border: Border;
  androidRipple: PressableAndroidRippleConfig;
};
