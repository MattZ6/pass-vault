import { forwardRef } from "react";
import type { View } from "react-native";

import {
	TouchableScale,
	type TouchableScaleProps,
} from "@/components/TouchableScale";

import { useTheme } from "@/hooks/useTheme";

import { View as PerformantView } from "@/lib/View";

import { stylesheet } from "./styles";

type Props = TouchableScaleProps;

export const IconButton = forwardRef<View, Props>(
	({ children, ...props }, ref) => {
		const { theme } = useTheme();
		const styles = stylesheet(theme);

		return (
			<PerformantView style={styles.wrapper}>
				<TouchableScale ref={ref} {...props}>
					<PerformantView style={styles.content}>{children}</PerformantView>
				</TouchableScale>
			</PerformantView>
		);
	},
);

IconButton.displayName = "IconButton";
