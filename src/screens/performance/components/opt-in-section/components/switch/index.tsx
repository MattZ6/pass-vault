import { Host, Switch as JCSwitch } from "@expo/ui/jetpack-compose";
import { useTheme } from "@/hooks/use-theme";

type Props = {
  value: boolean;
};

export function Switch({ value }: Props) {
  const { theme, resolvedThemeOption } = useTheme();

  return (
    <Host matchContents colorScheme={resolvedThemeOption}>
      <JCSwitch
        value={value}
        colors={{
          uncheckedTrackColor: theme.colors.surface.elevated,
          checkedTrackColor: theme.colors.content.base,
          uncheckedBorderColor: theme.colors.content.muted,
          checkedBorderColor: theme.colors.content.base,
          uncheckedThumbColor: theme.colors.content.muted,
          checkedThumbColor: theme.colors.surface.element,
          uncheckedIconColor: theme.colors.content.element,
          checkedIconColor: theme.colors.surface.element,
        }}
      />
    </Host>
  );
}
