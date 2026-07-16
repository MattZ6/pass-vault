import { Host, Toggle as SUIToggle } from "@expo/ui/swift-ui";
import { useTheme } from "@/hooks/use-theme";

type Props = {
  value: boolean;
};

export function Switch({ value }: Props) {
  const { resolvedThemeOption } = useTheme();

  return (
    <Host matchContents colorScheme={resolvedThemeOption}>
      <SUIToggle
        isOn={value}
      />
    </Host>
  );
}
