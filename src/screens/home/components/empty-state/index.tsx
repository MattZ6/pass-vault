import FeatherIcon from "@expo/vector-icons/Feather";
import * as ExpoHaptics from "expo-haptics";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";

import { TouchableScaleOpacity } from "@/components/ui/touchable-scale-opacity";

import { colors } from "@/styles/themes/colors/dark";

export function EmptyState() {
  const router = useRouter();

  const handlePress = useCallback(() => {
    ExpoHaptics.impactAsync(ExpoHaptics.ImpactFeedbackStyle.Light);
    router.push("/new");
  }, [router.push]);

  return (
    <TouchableScaleOpacity style={styles.pressable} onPress={handlePress}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <FeatherIcon name="key" size={48} color={colors.mauve11} />
        </View>
        <Text style={styles.title}>Yout vault is empty</Text>
        <Text style={styles.description}>
          Add your first password to get started
        </Text>
        <Text style={styles.hint}>Tap to continue</Text>
      </View>
    </TouchableScaleOpacity>
  );
}

const styles = StyleSheet.create({
  pressable: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    padding: 24,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    padding: 24,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",

    width: 96,
    height: 96,
    borderRadius: 24,
    marginBottom: 24,

    borderWidth: 1,
    borderColor: colors.mauve4,

    backgroundColor: colors.mauve1,
  },
  title: {
    fontWeight: "500",
    fontSize: 18,
    lineHeight: 24,
    color: colors.mauve12,
  },
  description: {
    color: colors.mauve11,
    fontSize: 16,
    lineHeight: 24,
  },
  hint: {
    color: colors.mauve9,
    fontSize: 16,
    lineHeight: 24,
  },
});
