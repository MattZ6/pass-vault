import FeatherIcon from "@expo/vector-icons/Feather";
import * as ExpoHaptics from "expo-haptics";
import { Link } from "expo-router";
import { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TouchableScaleOpacity } from "@/components/ui/touchable-scale-opacity";
import { colors } from "@/styles/themes/colors/dark";

export function AddButton() {
  const { bottom } = useSafeAreaInsets();

  const handleClick = useCallback(() => {
    ExpoHaptics.impactAsync(ExpoHaptics.ImpactFeedbackStyle.Light);
  }, []);

  return (
    <View style={[styles.container, { bottom }]}>
      <Link href="/new" asChild>
        <TouchableScaleOpacity onPress={handleClick}>
          <View style={styles.button}>
            <FeatherIcon name="plus" color={colors.mauve12} size={24} />
          </View>
        </TouchableScaleOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    right: 24,
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
