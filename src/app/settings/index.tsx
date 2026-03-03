import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Header } from "@/components/Header";
import { AppSection } from "@/components/settings";
import { AboutSection } from "@/components/settings/AboutSection";

import { useTheme } from "@/hooks/useTheme";

import { View } from "@/lib/View";

import { stylesheet } from "./styles";

export default function SettingsPage() {
	const insets = useSafeAreaInsets();
	const { theme } = useTheme();
	const styles = stylesheet(theme);
	const { t } = useTranslation("settings");

	return (
		<View style={styles.container}>
			<Header.Root>
				<Header.BackButton />

				<Header.Title>{t("title")}</Header.Title>
			</Header.Root>

			<ScrollView
				contentContainerStyle={[
					styles.scrollContent,
					{ paddingLeft: insets.left, paddingRight: insets.right },
				]}
			>
				<AppSection />

				<AboutSection />
			</ScrollView>
		</View>
	);
}
