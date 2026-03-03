import { StyleSheet } from "react-native";

import type { Theme } from "@/styles/themes/types";

export const SectionItemLabelStyles = {
	stylesheet(theme: Theme) {
		return StyleSheet.create({
			label: {
				fontFamily: theme.fonts.family.medium,
				fontSize: theme.fonts.size.body.md,
				color: theme.colors.mauve12,

				marginRight: "auto",
			},
		});
	},
};
