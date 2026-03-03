import type { ReactNode } from "react";

import { useTheme } from "@/hooks/useTheme";

import { View } from "@/lib/View";

import { stylesheet } from "./styles";

export type SectionHeaderProps = {
	children: ReactNode;
};

export function SectionHeader(props: SectionHeaderProps) {
	const { theme } = useTheme();
	const styles = stylesheet(theme);

	return <View {...props} style={styles.container} />;
}
