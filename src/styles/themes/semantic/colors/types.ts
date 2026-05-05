import type { OpaqueColorValue } from "react-native";

type AppColorValue = OpaqueColorValue | string;

type Surface = {
  base: AppColorValue;
};

type Content = {
  base: AppColorValue;
  muted: AppColorValue;
};

type Border = {
  default: AppColorValue;
};

export type Colors = {
  surface: Surface;
  content: Content;
  border: Border;
};
