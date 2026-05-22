import { View, type ViewProps } from "react-native";

import { FieldProvider } from "@/components/ui/field/contexts/field";

import { useStyles } from "@/hooks/use-styles";

import { getStyles } from "./styles";

type Props = ViewProps & {
  invalid?: boolean;
};

export function FieldRoot({ style, invalid, ...props }: Props) {
  const { styles } = useStyles(getStyles);

  return (
    <FieldProvider invalid={invalid}>
      <View {...props} style={[styles.container, style]} />
    </FieldProvider>
  );
}
