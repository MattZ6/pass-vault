import { StyleSheet } from "react-native";

import type { Theme } from "@/styles/themes/types";

export function stylesheet(theme: Theme) {
	return StyleSheet.create({
		title: {
			fontFamily: theme.fonts.family.medium,
			fontSize: theme.fonts.size.heading.xs,
			color: theme.colors.mauve11,
		},
	});
}
