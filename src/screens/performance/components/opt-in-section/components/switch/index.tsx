import { Host, Switch as JCSwitch } from "@expo/ui/jetpack-compose";
import { useTheme } from "@/hooks/use-theme";

type Props = {
  value: boolean;
};

export function Switch({ value }: Props) {
  const { theme } = useTheme();

  return (
    <Host matchContents>
      <JCSwitch
        value={value}
        colors={{
          uncheckedTrackColor: theme.colors.surface.elevated,
          checkedTrackColor: theme.colors.surface.elevated,
          uncheckedBorderColor: theme.colors.border.element,
          checkedBorderColor: theme.colors.border.element,
          uncheckedThumbColor: theme.colors.content.muted,
          checkedThumbColor: theme.colors.content.base,
          uncheckedIconColor: theme.colors.content.base,
          checkedIconColor: theme.colors.content.base,
        }}
      />
    </Host>
  );
}
