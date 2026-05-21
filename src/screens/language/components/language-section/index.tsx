import { Fragment, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Platform } from "react-native";

import { Button } from "@/components/ui/button/index";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";

import type { LanguageContextTypes } from "@/contexts/language/types";

import { useHaptics } from "@/hooks/use-haptics";
import { useLanguage } from "@/hooks/use-language";
import { useTheme } from "@/hooks/use-theme";

export function LanguageSection() {
  const { t } = useTranslation("language", {
    keyPrefix: "screen.sections.language",
  });
  const { language, languages, changeLanguage } = useLanguage();
  const { performSelectFeedback } = useHaptics();
  const { theme } = useTheme();

  const handleChangeTheme = useCallback(
    (language: LanguageContextTypes.Language) => {
      performSelectFeedback();
      changeLanguage(language);
    },
    [changeLanguage, performSelectFeedback],
  );

  return (
    <Section.Root>
      <Section.Header>
        <Section.Header.Title>{t("label")}</Section.Header.Title>
      </Section.Header>

      <Card color="element">
        {languages.map((option, index) => (
          <Fragment key={option}>
            <Button onPress={() => handleChangeTheme(option)}>
              <Section.Item.Root>
                <Section.Item.Content>
                  <Section.Item.Content.Title>
                    {t(`options.${option}.title`)}
                  </Section.Item.Content.Title>
                  {option !== language && (
                    <Section.Item.Content.Description>
                      {t(`options.${option}.description`)}
                    </Section.Item.Content.Description>
                  )}
                </Section.Item.Content>

                <Section.Item.Trailing>
                  {option === language && (
                    <Section.Item.Trailing.Icon
                      tintColor={theme.colors.content.base}
                      size={Platform.select({
                        ios: theme.size[4],
                        android: theme.size[6],
                      })}
                      name={{ ios: "checkmark", android: "check" }}
                    />
                  )}
                </Section.Item.Trailing>
              </Section.Item.Root>
            </Button>

            {index !== languages.length - 1 && (
              <Section.Divider style={{ marginLeft: theme.spacing[4] }} />
            )}
          </Fragment>
        ))}
      </Card>
    </Section.Root>
  );
}
