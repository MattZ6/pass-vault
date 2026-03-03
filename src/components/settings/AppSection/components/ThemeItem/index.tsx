import * as ExpoHaptics from "expo-haptics";
import { Link } from "expo-router";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { SectionItem } from "@/components/Section/Item";
import { TouchableScale } from "@/components/TouchableScale";

import { useTheme } from "@/hooks/useTheme";

import { Icon } from "@/lib/Icon";

type Props = {
	label: string;
};

export function ThemeItem({ label }: Props) {
	const { theme, option } = useTheme();
	const { t } = useTranslation("theme");

	const handleClick = useCallback(() => {
		ExpoHaptics.impactAsync(ExpoHaptics.ImpactFeedbackStyle.Light);
	}, []);

	return (
		<Link href="/settings/theme" asChild>
			<TouchableScale onPress={handleClick}>
				<SectionItem.Root>
					<Icon name="palette" size={24} color={theme.colors.mauve11} />

					<SectionItem.Label>{label}</SectionItem.Label>

					<SectionItem.Value>{t(option)}</SectionItem.Value>

					<Icon name="chevron-right" size={24} color={theme.colors.mauve11} />
				</SectionItem.Root>
			</TouchableScale>
		</Link>
	);
}
