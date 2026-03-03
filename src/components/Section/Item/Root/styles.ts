import { StyleSheet } from "react-native";

import type { Theme } from "@/styles/themes/types";

export const SectionItemRootStyles = {
	stylesheet(_: Theme) {
		return StyleSheet.create({
			container: {
				flexDirection: "row",
				alignItems: "center",
				gap: 16,

				paddingVertical: 16,
				paddingHorizontal: 16,
			},
		});
	},
};
