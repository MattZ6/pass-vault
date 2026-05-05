import * as ExpoHaptics from "expo-haptics";
import { useCallback } from "react";

import { SectionItem } from "@/components/Section/Item";
import { TouchableScaleOpacity } from "@/components/ui/touchable-scale-opacity";

import { useTheme } from "@/hooks/use-theme";

import { Icon } from "@/lib/Icon";

type Props = {
  label: string;
};

export function ChangelogItem({ label }: Props) {
  const { theme } = useTheme();

  const handleClick = useCallback(() => {
    ExpoHaptics.impactAsync(ExpoHaptics.ImpactFeedbackStyle.Light);
  }, []);

  return (
    <TouchableScaleOpacity onPress={handleClick}>
      <SectionItem.Root>
        <Icon name="history-edu" size={24} color={theme.colors.content.muted} />

        <SectionItem.Label>{label}</SectionItem.Label>

        <Icon
          name="chevron-right"
          size={24}
          color={theme.colors.content.muted}
        />
      </SectionItem.Root>
    </TouchableScaleOpacity>
  );
}
