import * as ExpoHaptics from "expo-haptics";
import { Link } from "expo-router";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { SectionItem } from "@/components/Section/Item";
import { TouchableScaleOpacity } from "@/components/ui/touchable-scale-opacity";
import { useTheme } from "@/hooks/use-theme";
import { useLanguage } from "@/hooks/useLanguage";

import { Icon } from "@/lib/Icon";

type Props = {
  label: string;
};

export function LanguageItem({ label }: Props) {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const { t } = useTranslation("languages");

  const handleClick = useCallback(() => {
    ExpoHaptics.impactAsync(ExpoHaptics.ImpactFeedbackStyle.Light);
  }, []);

  return (
    <Link href="/settings/language" asChild>
      <TouchableScaleOpacity onPress={handleClick}>
        <SectionItem.Root>
          <Icon name="translate" size={24} color={theme.colors.content.muted} />

          <SectionItem.Label>{label}</SectionItem.Label>

          <SectionItem.Value>{t(`${language}.title`)}</SectionItem.Value>

          <Icon
            name="chevron-right"
            size={24}
            color={theme.colors.content.muted}
          />
        </SectionItem.Root>
      </TouchableScaleOpacity>
    </Link>
  );
}
