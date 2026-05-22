import { forwardRef, useCallback, useEffect } from "react";
import {
  type BlurEvent,
  type FocusEvent,
  TextInput,
  type TextInputProps,
} from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { useFieldContext } from "@/components/ui/field/hooks/use-field";

import { useStyles } from "@/hooks/use-styles";

import { getStyles } from "./styles";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const ANIMATION_DURATION_IN_MS = 140;

type Ref = TextInput;
type Props = TextInputProps;

export const FieldTextInput = forwardRef<Ref, Props>(
  ({ onFocus, onBlur, ...props }, ref) => {
    const { invalid } = useFieldContext();

    const isFocused = useSharedValue(0);
    const isInvalidProgress = useSharedValue(0);

    const { styles, theme } = useStyles(getStyles);

    const handleFocus = useCallback(
      (event: FocusEvent) => {
        if (onFocus) {
          onFocus(event);
        }

        isFocused.value = withTiming(1, {
          duration: ANIMATION_DURATION_IN_MS,
        });
      },
      [onFocus, isFocused],
    );

    const handleBlur = useCallback(
      (event: BlurEvent) => {
        if (onBlur) {
          onBlur(event);
        }

        isFocused.value = withTiming(0, {
          duration: ANIMATION_DURATION_IN_MS,
        });
      },
      [onBlur, isFocused],
    );

    const animatedStyles = useAnimatedStyle(() => {
      return {
        borderColor: interpolateColor(
          isInvalidProgress.value,
          [0, 1],
          [
            interpolateColor(
              isFocused.value,
              [0, 1],
              [
                theme.colors.surface.element.toString(),
                theme.colors.border.element.toString(),
              ],
            ),
            theme.colors.border.error.toString(),
          ],
        ),
      };
    });

    useEffect(() => {
      isInvalidProgress.value = withTiming(invalid ? 1 : 0, {
        duration: ANIMATION_DURATION_IN_MS,
      });
    }, [invalid, isInvalidProgress]);

    return (
      <AnimatedTextInput
        ref={ref}
        placeholderTextColor={theme.colors.content.muted}
        selectionColor={
          invalid ? theme.colors.content.error : theme.colors.content.element
        }
        cursorColor={
          invalid ? theme.colors.content.error : theme.colors.content.muted
        }
        {...props}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={[styles.input, animatedStyles]}
      />
    );
  },
);

FieldTextInput.displayName = "FieldTextInput";
