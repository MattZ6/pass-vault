import { SectionItem } from "@/components/Section/Item";

import { useLanguage } from "@/hooks/useLanguage";
import { useTheme } from "@/hooks/useTheme";

import { Icon } from "@/lib/Icon";

import { DateUtils } from "@/utils/Date";

type Props = {
	label: string;
	date: Date;
};

export function InstallationDateItem({ label, date }: Props) {
	const { theme } = useTheme();
	const { language } = useLanguage();

	return (
		<SectionItem.Root>
			<Icon name="install-mobile" size={24} color={theme.colors.mauve11} />

			<SectionItem.Label>{label}</SectionItem.Label>

			<SectionItem.Value>
				{DateUtils.format(date, { locale: language })}
			</SectionItem.Value>
		</SectionItem.Root>
	);
}
