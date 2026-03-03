import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, type ListRenderItemInfo } from "react-native";

import { Header } from "@/components/Header";
import { TouchableScale } from "@/components/TouchableScale";

import { useTheme } from "@/hooks/useTheme";

import { Icon } from "@/lib/Icon";
import { Text } from "@/lib/Text";
import { View } from "@/lib/View";

import { stylesheet } from "./styles";

export function ThemeScreen() {
  const { option, options, changeTheme, theme } = useTheme();
  const styles = stylesheet(theme);
  const { t } = useTranslation("theme");

  const handleChangeTheme = useCallback(
    (theme: typeof option) => {
      changeTheme(theme);
    },
    [changeTheme],
  );

  function renderItem({ item }: ListRenderItemInfo<typeof option>) {
    const isSelected = item === option;

    return (
      <TouchableScale onPress={() => handleChangeTheme(item)}>
        <View style={styles.button}>
          <View style={styles.buttonContent}>
            <Text style={styles.buttonLabel}>{t(`options.${item}`)}</Text>
          </View>

          {isSelected && (
            <Icon name="check" size={24} color={theme.colors.mauve12} />
          )}
        </View>
      </TouchableScale>
    );
  }

  return (
    <View style={styles.container}>
      <Header.Root>
        <Header.BackButton />

        <Header.Title>{t("title")}</Header.Title>
      </Header.Root>

      <FlatList
        data={options}
        keyExtractor={(item) => String(item)}
        renderItem={renderItem}
        contentContainerStyle={styles.scrollContent}
      />
    </View>
  );
}
