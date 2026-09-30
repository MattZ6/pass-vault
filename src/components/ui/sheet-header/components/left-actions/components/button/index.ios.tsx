import type { SheetHeaderLeftActionsButtonProps } from "./types";

// Never rendered directly: Stack.Toolbar only accepts <Stack.Toolbar.Button>
// (and a couple of other exact component references) as its own direct
// children — it checks the child's element type, not what it renders to,
// so a custom component that merely wraps Stack.Toolbar.Button internally
// still gets rejected. SheetHeaderLeftActions (../../index.ios.tsx) reads
// this element's props instead and builds the real Stack.Toolbar.Button in
// its place.
export function SheetHeaderLeftActionsButton(
  _props: SheetHeaderLeftActionsButtonProps,
) {
  return null;
}
