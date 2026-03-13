import FeatherIcon from "@expo/vector-icons/Feather";
import * as ExpoHaptics from "expo-haptics";
import { Link } from "expo-router";
import { useCallback } from "react";
import {
  FlatList,
  type ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TouchableScaleOpacity } from "@/components/ui/touchable-scale-opacity";
import { type CredentialMeta, useVaultStore } from "@/store/vault";
import { colors } from "@/styles/themes/colors/dark";
import { AddButton } from "./components/add-button";
import { EmptyState } from "./components/empty-state";
import { ListHeader } from "./components/list-header";

export function HomeScreen() {
  const { bottom } = useSafeAreaInsets();
  const credentials = useVaultStore((s) => s.credentials);

  const handleClick = useCallback(() => {
    ExpoHaptics.impactAsync(ExpoHaptics.ImpactFeedbackStyle.Light);
  }, []);

  function renderItem({ item }: ListRenderItemInfo<CredentialMeta>) {
    return (
      <Link
        asChild
        href={{
          pathname: "/credentials/[id]",
          params: { id: item.id },
        }}
      >
        <TouchableScaleOpacity onPress={handleClick}>
          <View style={styles.item}>
            <View style={styles.itemLogo}>
              <FeatherIcon name="key" color={colors.mauve9} size={20} />
            </View>
            <View style={styles.itemContent}>
              <Text style={styles.itemApp}>{item.service}</Text>
              <Text style={styles.itemUsername}>{item.username}</Text>
            </View>

            <FeatherIcon name="chevron-right" color={colors.mauve9} size={20} />
          </View>
        </TouchableScaleOpacity>
      </Link>
    );
  }

  return (
    <View style={styles.container}>
      {/* <View style={styles.toolbar}>
        <View></View>
        <View style={styles.toolbarButton}>
          <FeatherIcon name="settings" color={colors.mauve9} size={20} />
        </View>
      </View> */}

      <FlatList
        data={credentials}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={EmptyState}
        style={styles.list}
        contentContainerStyle={[
          styles.contentContainerStyle,
          {
            paddingBottom: styles.contentContainerStyle.paddingBottom + bottom,
          },
        ]}
        showsVerticalScrollIndicator={false}
      />

      <AddButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  contentContainerStyle: {
    // flex: 1,
    // paddingTop: 60 + 20,
    paddingBottom: 16 + 72 + 16,
  },
  toolbar: {
    position: "absolute",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    right: 0,
    gap: 16,
    paddingTop: 60,
    paddingHorizontal: 24,
    zIndex: 1,
  },
  toolbarButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  tags: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: "row",
    gap: 8,
  },
  tag: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#171717",
    borderRadius: 36,
    paddingHorizontal: 16,
    height: 36,
  },
  tagTitle: {
    fontSize: 14,
    lineHeight: 24,
    color: colors.mauve11,
    textAlign: "center",
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 20,
  },
  itemLogo: {
    alignItems: "center",
    justifyContent: "center",

    width: 44,
    height: 44,
    borderRadius: 12,

    borderWidth: 1,
    borderColor: colors.mauve4,

    backgroundColor: colors.mauve1,
  },
  itemContent: {
    flex: 1,
  },
  itemApp: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
    color: colors.mauve12,
  },
  itemUsername: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.mauve11,
  },
  footer: {
    position: "absolute",
    bottom: 40,
    right: 20,
  },
  searchButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,

    height: 52,
    borderRadius: 52,

    paddingHorizontal: 16,

    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  searchButtonText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#999999",
  },
  button: {
    width: 72,
    height: 72,
    borderRadius: 72,

    backgroundColor: colors.mauve3,

    alignItems: "center",
    justifyContent: "center",
  },
});
