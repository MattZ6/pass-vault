import { useTranslation } from "react-i18next";

import { Section } from "@/components/Section";

import { LanguageItem, ThemeItem } from "./components";

export function AppSection() {
	const { t } = useTranslation("settings", { keyPrefix: "app" });

	return (
		<Section.Root>
			<Section.Header>
				<Section.Title>{t("title")}</Section.Title>
			</Section.Header>

			<Section.Content>
				<ThemeItem label={t("theme")} />

				<Section.Divider />

				<LanguageItem label={t("language")} />
			</Section.Content>
		</Section.Root>
	);
}
