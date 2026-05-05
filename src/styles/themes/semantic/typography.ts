import { fontSize } from "../tokens/text/font-size";
import { lineHeight } from "../tokens/text/line-height";

export const typography = {
  label: {
    fontSize: fontSize[1],
    lineHeight: lineHeight[1],
  },
  bodySmall: {
    fontSize: fontSize[2],
    lineHeight: lineHeight[2],
  },
  body: {
    fontSize: fontSize[3],
    lineHeight: lineHeight[3],
  },
  subtitle: {
    fontSize: fontSize[4],
    lineHeight: lineHeight[4],
  },
  title: {
    fontSize: fontSize[5],
    lineHeight: lineHeight[5],
  },
};

export type Typography = typeof typography;
export type TypographyOptions = keyof Typography;
