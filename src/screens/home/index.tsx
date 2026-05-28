import {
  LegendList,
  type LegendListRenderItemProps,
} from "@legendapp/list/react-native";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useStyles } from "@/hooks/use-styles";

import { VaultService } from "@/services/vault/credentials";

import type { CredentialMeta } from "@/store/credentials/slices/meta.slice";
import { useVaultStore } from "@/store/credentials/vault.store";

import { CredentialItem } from "./components/credential-item";
import { EmptyState } from "./components/empty-state";
import { ItemSeparator } from "./components/item-separator";
import { ToolbarActions } from "./components/toolbar-actions";

import { getStyles } from "./styles";

export function HomeScreen() {
  const { t } = useTranslation("home", { keyPrefix: "meta" });
  const safeInsets = useSafeAreaInsets();
  const { styles, theme } = useStyles((input) => getStyles(input, safeInsets));
  const credentialsMeta = useVaultStore((s) => s.credentialsMeta);

  const renderItem = ({ item }: LegendListRenderItemProps<CredentialMeta>) => {
    return <CredentialItem credential={item} />;
  };

  useEffect(() => {
    VaultService.loadCredentialsIntoStore();
  }, []);

  return (
    <>
      <Stack.Screen.Title
        large
        largeStyle={{
          fontFamily: theme.fontFamily.bold,
          color: theme.colors.content.base.toString(),
        }}
        style={{
          fontFamily: Platform.select({
            android: theme.fontFamily.semiBold,
            ios: theme.fontFamily.semiBold,
          }),
          color: theme.colors.content.base.toString(),
        }}
      >
        {t("title")}
      </Stack.Screen.Title>

      <ToolbarActions />

      <LegendList
        contentInsetAdjustmentBehavior="automatic"
        automaticallyAdjustsScrollIndicatorInsets
        fadingEdgeLength={{
          start: 8,
          end: 32,
        }}
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}
        data={credentialsMeta}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ItemSeparator}
        ListEmptyComponent={EmptyState}
        recycleItems
      />
    </>
  );
}
