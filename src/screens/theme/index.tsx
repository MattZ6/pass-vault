import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, type ListRenderItemInfo } from "react-native";

import { Header } from "@/components/Header";
import { TouchableScaleOpacity } from "@/components/ui/touchable-scale-opacity";

import { useTheme } from "@/hooks/use-theme";

import { Icon } from "@/lib/Icon";
import { Text } from "@/lib/Text";
import { View } from "@/lib/View";

import { stylesheet } from "./styles";

export function ThemeScreen() {
  const { themeOption, themeOptions, changeTheme, theme } = useTheme();
  const styles = stylesheet(theme);
  const { t } = useTranslation("theme");

  const handleChangeTheme = useCallback(
    (theme: typeof themeOption) => {
      changeTheme(theme);
    },
    [changeTheme],
  );

  function renderItem({ item }: ListRenderItemInfo<typeof themeOption>) {
    const isSelected = item === themeOption;

    return (
      <TouchableScaleOpacity onPress={() => handleChangeTheme(item)}>
        <View style={styles.button}>
          <View style={styles.buttonContent}>
            <Text style={styles.buttonLabel}>{t(`themeOptions.${item}`)}</Text>
          </View>

          {isSelected && (
            <Icon name="check" size={24} color={theme.colors.content.base} />
          )}
        </View>
      </TouchableScaleOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Header.Root>
        <Header.BackButton />

        <Header.Title>{t("title")}</Header.Title>
      </Header.Root>

      <FlatList
        data={themeOptions}
        keyExtractor={(item) => String(item)}
        renderItem={renderItem}
        contentContainerStyle={styles.scrollContent}
      />
    </View>
  );
}
