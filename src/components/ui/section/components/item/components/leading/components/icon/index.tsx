import { SymbolView, type SymbolViewProps } from "expo-symbols";

import { useTheme } from "@/hooks/use-theme";

type Props = SymbolViewProps;

export function SectionItemLeadingIcon(props: Props) {
  const { theme } = useTheme();

  return (
    <SymbolView
      tintColor={theme.colors.content.base}
      size={theme.size[6]}
      {...props}
    />
  );
}
