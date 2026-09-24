import {
  AnimatedText,
  type AnimatedTextProps,
} from "@/components/ui/text/animated";

import { useRevealAnimation } from "../../hooks/use-reveal-animation";

type Props = AnimatedTextProps & {
  delay?: number;
};

export function AnimatedTitle({ style, delay, ...props }: Props) {
  const animatedStyle = useRevealAnimation(delay);

  return (
    <AnimatedText
      weight="semiBold"
      typography="subtitle"
      {...props}
      style={[style, animatedStyle]}
    />
  );
}
