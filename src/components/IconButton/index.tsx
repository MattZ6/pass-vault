import { forwardRef } from "react";
import type { View } from "react-native";

import {
  TouchableScaleOpacity,
  type TouchableScaleOpacityProps,
} from "@/components/ui/touchable-scale-opacity";

import { useTheme } from "@/hooks/useTheme";

import { View as PerformantView } from "@/lib/View";

import { stylesheet } from "./styles";

type Props = TouchableScaleOpacityProps;

export const IconButton = forwardRef<View, Props>(
  ({ children, ...props }, ref) => {
    const { theme } = useTheme();
    const styles = stylesheet(theme);

    return (
      <PerformantView style={styles.wrapper}>
        <TouchableScaleOpacity ref={ref} {...props}>
          <PerformantView style={styles.content}>{children}</PerformantView>
        </TouchableScaleOpacity>
      </PerformantView>
    );
  },
);

IconButton.displayName = "IconButton";
