import type { ReactNode } from "react";

import { useTheme } from "@/hooks/useTheme";

import { View } from "@/lib/View";

import { stylesheet } from "./styles";

export type SectionRootProps = {
	children: ReactNode;
};

export function SectionRoot(props: SectionRootProps) {
	const { theme } = useTheme();
	const styles = stylesheet(theme);

	return <View {...props} style={styles.container} />;
}
