import { StyleSheet } from "react-native";

import type { Theme } from "@/styles/themes/types";

export function stylesheet(theme: Theme) {
	return StyleSheet.create({
		header: {
			flexDirection: "row",
			alignItems: "center",
			gap: 8,

			paddingVertical: 8,
			paddingHorizontal: 16,

			borderBottomWidth: 1,
			borderBottomColor: theme.colors.mauve4,

			backgroundColor: theme.colors.mauve2,
		},
	});
}
