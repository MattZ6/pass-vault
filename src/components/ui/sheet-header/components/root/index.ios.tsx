import { Stack } from "expo-router";

import type { SheetHeaderRootProps } from "./types";

export function SheetHeaderRoot(props: SheetHeaderRootProps) {
  return <Stack.Screen options={{ headerTransparent: true }} {...props} />;
}
