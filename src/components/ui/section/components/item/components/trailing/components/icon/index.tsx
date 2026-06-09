import { SymbolView, type SymbolViewProps } from "expo-symbols";
import { Platform } from "react-native";

import { useTheme } from "@/hooks/use-theme";

import type { ContentColorsOptions } from "@/styles/themes/semantic/colors/types";

type Props = Partial<SymbolViewProps> & {
  color?: ContentColorsOptions;
};

export function SectionItemTrailingIcon({
  name = {
    ios: "chevron.right",
    android: "chevron_right",
  },
  color = "element",
  ...props
}: Props) {
  const { theme } = useTheme();

  return (
    <SymbolView
      name={name}
      tintColor={theme.colors.content[color]}
      size={Platform.select({ ios: theme.size[3], default: theme.size[6] })}
      {...props}
    />
  );
}
