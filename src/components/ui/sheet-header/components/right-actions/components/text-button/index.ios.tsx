import type { SheetHeaderRightActionsTextButtonProps } from "./types";

// Never rendered directly — same marker pattern as the icon Button (see
// ../button/index.ios.tsx): SheetHeaderRightActions (../../index.ios.tsx)
// reads this element's props and builds the real Stack.Toolbar.Button in
// its place.
export function SheetHeaderRightActionsTextButton(
  _props: SheetHeaderRightActionsTextButtonProps,
) {
  return null;
}
