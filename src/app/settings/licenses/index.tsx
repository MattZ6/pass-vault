import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
	FlatList,
	Image,
	type ListRenderItemInfo,
	Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import licenses from "@/assets/licenses.json";

import { Header } from "@/components/Header";

import { useTheme } from "@/hooks/useTheme";

import { Text } from "@/lib/Text";
import { View } from "@/lib/View";

import { stylesheet } from "./styles";

type License = {
	key: string;
	name: string;
	version: string;
	licenses: string;
	repository: string;
	licenseUrl: string;
	parents: string;
	imageUrl: string;
};
const parsedLicenses = Object.keys(licenses)
	.map<License>((key) => {
		let name = key;
		let version = null;

		if (key.lastIndexOf("@") > 0) {
			name = key.substring(0, key.lastIndexOf("@"));
			version = `v${key.substring(key.lastIndexOf("@") + 1)}`;
		}

		const repository = String(licenses[key].repository || "");
		const paths = repository.split("/");
		paths.pop();

		return {
			...licenses[key],
			key,
			name,
			version,
			imageUrl: paths.join("/").concat(".png?size=80"),
		};
	})
	.sort((previous, current) => previous.name.localeCompare(current.name));

export default function LicensesPage() {
	const insets = useSafeAreaInsets();
	const { theme } = useTheme();
	const styles = stylesheet(theme);
	const { t } = useTranslation("licenses");

	const insetsBottom = Platform.select({
		android: insets.bottom,
		native: 0,
	});

	const renderItem = useCallback(
		({ item }: ListRenderItemInfo<License>) => {
			return (
				<View
					style={{
						paddingHorizontal: 16,
						paddingVertical: 8,
						flexDirection: "row",
						gap: 16,
						height: 88,
					}}
				>
					<View
						style={{
							width: 40,
							height: 40,
							backgroundColor: theme.colors.mauve2,
							alignItems: "center",
							justifyContent: "center",
							borderWidth: 1,
							borderStyle: "solid",
							borderColor: theme.colors.mauve6,
							borderRadius: 8,
							overflow: "hidden",
						}}
					>
						<Image
							source={{ uri: item.imageUrl }}
							style={{
								width: 40,
								height: 40,
							}}
							alt=""
						/>
					</View>

					<View>
						<Text
							style={{
								fontFamily: theme.fonts.family.medium,
								color: theme.colors.mauve12,
							}}
						>
							{item.name}
						</Text>
						<Text
							style={{
								fontFamily: theme.fonts.family.regular,
								color: theme.colors.mauve11,
							}}
						>
							{item.version}
						</Text>
						<Text
							style={{
								fontFamily: theme.fonts.family.regular,
								color: theme.colors.mauve11,
							}}
						>
							{item.licenses}
						</Text>
					</View>
				</View>
			);
		},
		[theme],
	);

	return (
		<View style={styles.container}>
			<Header.Root>
				<Header.BackButton />
				<Header.Title>{t("title")}</Header.Title>
			</Header.Root>

			<FlatList
				style={{ flex: 1 }}
				data={parsedLicenses}
				keyExtractor={(item) => item.key}
				renderItem={renderItem}
				contentContainerStyle={[
					styles.scrollContent,
					{ paddingBottom: styles.scrollContent.paddingBottom + insetsBottom },
				]}
			/>
		</View>
	);
}
