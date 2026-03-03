import * as ExpoHaptics from "expo-haptics";
import { useCallback } from "react";

import { SectionItem } from "@/components/Section/Item";
import { TouchableScale } from "@/components/TouchableScale";

import { useTheme } from "@/hooks/useTheme";

import { Icon } from "@/lib/Icon";

type Props = {
	label: string;
};

export function ChangelogItem({ label }: Props) {
	const { theme } = useTheme();

	const handleClick = useCallback(() => {
		ExpoHaptics.impactAsync(ExpoHaptics.ImpactFeedbackStyle.Light);
	}, []);

	return (
		<TouchableScale onPress={handleClick}>
			<SectionItem.Root>
				<Icon name="history-edu" size={24} color={theme.colors.mauve11} />

				<SectionItem.Label>{label}</SectionItem.Label>

				<Icon name="chevron-right" size={24} color={theme.colors.mauve11} />
			</SectionItem.Root>
		</TouchableScale>
	);
}
