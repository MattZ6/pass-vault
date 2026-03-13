import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useVaultStore } from "@/store/vault";
import { colors } from "@/styles/themes/colors/dark";

export function ListHeader() {
  const { top } = useSafeAreaInsets();
  const credentialsCount = useVaultStore((s) => s.credentials.length);

  if (!credentialsCount) {
    return null;
  }

  return (
    <View
      style={[
        styles.container,
        { paddingTop: styles.container.paddingTop + top },
      ]}
    >
      <Text style={styles.title}>Pass Vault</Text>
      <Text style={styles.subtitle}>{credentialsCount} passwords secured</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 24,
    paddingBottom: 32,
    gap: 4,
  },
  title: {
    fontSize: 32,
    // lineHeight: 44,
    fontWeight: "700",
    color: colors.mauve12,
  },
  subtitle: {
    // fontSize: 16,
    fontSize: 14,
    // lineHeight: 24,
    color: colors.mauve9,
    textTransform: "uppercase",
  },
});
