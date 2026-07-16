import {
  LegendList,
  type LegendListRenderItemProps,
} from "@legendapp/list/react-native";
import { useObserve } from "expo-observe";
import { useCallback, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useStyles } from "@/hooks/use-styles";

import { LicenseItem } from "./components/license-item";
import { LicensesDivider } from "./components/licenses-divider";
import { ScreenHeader } from "./components/screen-header";

import { type License, licenses } from "./repositories/licenses";

import { getStyles } from "./styles";

export function LicensesScreen() {
  const safeInsets = useSafeAreaInsets();
  const { markInteractive } = useObserve();
  const { styles } = useStyles((input) => getStyles(input, safeInsets));

  useEffect(() => {
    markInteractive();
  }, [markInteractive]);

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
        nestedScrollEnabled
        contentInsetAdjustmentBehavior="automatic"
        recycleItems
        data={licenses}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
        ItemSeparatorComponent={LicensesDivider}
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}
        fadingEdgeLength={styles.fadingEdgeLength}
      />
    </>
  );
}
