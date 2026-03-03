import { createElement } from "react";
import type { TextProps as RNTextProps } from "react-native";

export type TextProps = RNTextProps;

export function Text(props: TextProps) {
	return createElement("RCTText", props);
}
