import type { SymbolViewProps } from "expo-symbols";
import { Fragment, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Platform } from "react-native";

import { Button } from "@/components/ui/button/index";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";

import type { ThemeContextTypes } from "@/contexts/theme/types";

import { useHaptics } from "@/hooks/use-haptics";
import { useTheme } from "@/hooks/use-theme";

const iconsMap: Record<ThemeContextTypes.ThemeOption, SymbolViewProps["name"]> =
  {
    system: { ios: "iphone", android: "contrast" },
    light: { ios: "moon.fill", android: "light_mode" },
    dark: { ios: "sun.max.fill", android: "dark_mode" },
  };

export function ThemeSection() {
  const { t } = useTranslation("appearance", {
    keyPrefix: "screen.sections.theme",
  });
  const { themeOption, themeOptions, changeTheme } = useTheme();
  const { performSelectFeedback } = useHaptics();
  const { theme } = useTheme();

  const handleChangeTheme = useCallback(
    (theme: ThemeContextTypes.ThemeOption) => {
      performSelectFeedback();
      changeTheme(theme);
    },
    [changeTheme, performSelectFeedback],
  );

  return (
    <Section.Root>
      <Section.Header>
        <Section.Header.Title>{t("label")}</Section.Header.Title>
      </Section.Header>

      <Card color="element">
        {themeOptions.map((option, index) => (
          <Fragment key={option}>
            <Button onPress={() => handleChangeTheme(option)}>
              <Section.Item.Root>
                <Section.Item.Leading>
                  <Section.Item.Leading.Icon name={iconsMap[option]} />
                </Section.Item.Leading>

                <Section.Item.Content>
                  <Section.Item.Content.Title>
                    {t(`options.${option}.label`)}
                  </Section.Item.Content.Title>
                </Section.Item.Content>

                <Section.Item.Trailing>
                  {option === themeOption && (
                    <Section.Item.Trailing.Icon
                      tintColor={theme.colors.content.base}
                      size={Platform.select({
                        ios: theme.size[4],
                        android: theme.size[6],
                      })}
                      name={{
                        ios: "checkmark",
                        android: "check",
                      }}
                    />
                  )}
                </Section.Item.Trailing>
              </Section.Item.Root>
            </Button>

            {index !== themeOptions.length - 1 && <Section.Divider />}
          </Fragment>
        ))}
      </Card>
    </Section.Root>
  );
}
