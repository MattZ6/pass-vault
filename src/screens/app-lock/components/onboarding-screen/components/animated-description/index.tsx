import {
  AnimatedText,
  type AnimatedTextProps,
} from "@/components/ui/text/animated";

import { useRevealAnimation } from "../../hooks/use-reveal-animation";

type Props = AnimatedTextProps & {
  delay?: number;
};

export function AnimatedDescription({ style, delay, ...props }: Props) {
  const animatedStyle = useRevealAnimation(delay);

  return (
    <AnimatedText
      typography="body"
      color="muted"
      {...props}
      style={[style, animatedStyle]}
    />
  );
}
