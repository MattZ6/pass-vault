import { SymbolView, type SymbolViewProps } from "expo-symbols";
import { Platform } from "react-native";

import { useTheme } from "@/hooks/use-theme";

type Props = Partial<SymbolViewProps>;

export function SectionItemTrailingIcon({
  name = {
    ios: "chevron.right",
    android: "chevron_right",
  },
  ...props
}: Props) {
  const { theme } = useTheme();

  return (
    <SymbolView
      name={name}
      tintColor={theme.colors.content.element}
      size={Platform.select({ ios: theme.size[3], default: theme.size[6] })}
      {...props}
    />
  );
}
