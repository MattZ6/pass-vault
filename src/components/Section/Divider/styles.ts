import { StyleSheet } from "react-native";

import type { Theme } from "@/styles/themes/types";

export function stylesheet(theme: Theme) {
	return StyleSheet.create({
		divider: {
			height: 1,
			backgroundColor: theme.colors.mauve4,
		},
	});
}
