import { createElement } from "react";
import type { ViewProps as RNViewProps } from "react-native";

export type ViewProps = RNViewProps;

export function View(props: ViewProps) {
  return createElement("RCTView", props);
}
