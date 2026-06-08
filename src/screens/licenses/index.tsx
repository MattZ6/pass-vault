import {
  LegendList,
  type LegendListRenderItemProps,
} from "@legendapp/list/react-native";
import { useCallback } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useStyles } from "@/hooks/use-styles";

import { LicenseItem } from "./components/license-item";
import { LicensesDivider } from "./components/licenses-divider";
import { ScreenHeader } from "./components/screen-header";

import { type License, licenses } from "./repositories/licenses";

import { getStyles } from "./styles";

export function LicensesScreen() {
  const safeInsets = useSafeAreaInsets();
  const { styles, theme } = useStyles((input) => getStyles(input, safeInsets));

  const renderItem = useCallback(
    ({ item }: LegendListRenderItemProps<License>) => {
      return (
        <LicenseItem
          imageUrl={item.imageUrl}
          name={item.name}
          licenses={item.licenses}
          version={item.version}
        />
      );
    },
    [],
  );

  return (
    <>
      <ScreenHeader />

      <LegendList
        data={licenses}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
        recycleItems
        ItemSeparatorComponent={LicensesDivider}
        contentInsetAdjustmentBehavior="automatic"
        style={styles.list}
        contentContainerStyle={styles.scrollContainer}
        fadingEdgeLength={{
          start: theme.size[2],
          end: theme.size[8],
        }}
      />
    </>
  );
}
