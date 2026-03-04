import MaterialIcon from "@expo/vector-icons/MaterialIcons";
import { useTranslation } from "react-i18next";
import { FlatList, type ListRenderItemInfo } from "react-native";

import { Header } from "@/components/Header";
import { TouchableScaleOpacity } from "@/components/ui/touchable-scale-opacity";

import { useLanguage } from "@/hooks/useLanguage";
import { useTheme } from "@/hooks/useTheme";

import { Text } from "@/lib/Text";
import { View } from "@/lib/View";

import { stylesheet } from "./styles";

export function LanguageScreen() {
  const { theme } = useTheme();
  const styles = stylesheet(theme);
  const { language, languages, changeLanguage } = useLanguage();
  const { t: languageT } = useTranslation("language");
  const { t } = useTranslation("languages");

  function renderItem({ item }: ListRenderItemInfo<typeof language>) {
    const label = t(`${item}.label`);
    const isSelected = language === item;

    return (
      <TouchableScaleOpacity onPress={() => changeLanguage(item)}>
        <View style={styles.button}>
          <View style={styles.buttonContent}>
            <Text style={styles.buttonLabel}>{t(`${item}.title`)}</Text>
            {label && <Text style={styles.buttonValue}>{label}</Text>}
          </View>

          {isSelected && (
            <MaterialIcon name="check" size={24} color={theme.colors.mauve12} />
          )}
        </View>
      </TouchableScaleOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Header.Root>
        <Header.BackButton />

        <Header.Title>{languageT("title")}</Header.Title>
      </Header.Root>

      <FlatList
        contentContainerStyle={styles.scrollContent}
        data={languages}
        keyExtractor={(item) => item}
        renderItem={renderItem}
      />
    </View>
  );
}
