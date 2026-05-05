import * as ExpoHaptics from "expo-haptics";
import { Link } from "expo-router";
import { useCallback } from "react";
import { Button, Platform, ScrollView, ToastAndroid } from "react-native";
import Animated, {
  FadeInRight,
  FadeOutRight,
  LinearTransition,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Header } from "@/components";
import { IconButton } from "@/components/IconButton";
import { TouchableScaleOpacity } from "@/components/ui/touchable-scale-opacity";
import { useTheme } from "@/hooks/use-theme";
import { useProviders } from "@/hooks/useProviders";

import { Icon } from "@/lib/Icon";
import { Text } from "@/lib/Text";
import { View } from "@/lib/View";

import { stylesheet } from "./styles";

export function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [providers, setProviders] = useProviders();
  const { theme } = useTheme();
  const styles = stylesheet(theme);

  const handleAddProvider = useCallback(() => {
    setProviders([
      {
        id: Date.now().toString(),
        name: "YouTube",
        account: "john@doe.com",
        password: "fake-password",
      },
      ...providers,
    ]);
  }, [providers, setProviders]);

  const handleRemoveProvider = useCallback(() => {
    const [_, ...rest] = providers;

    setProviders(rest);
  }, [providers, setProviders]);

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <Header.Root>
        <Text style={styles.headerTitle}>PassVault</Text>

        <Header.Actions>
          <Link href="/settings" asChild>
            <IconButton>
              <Icon
                name="settings"
                size={24}
                color={theme.colors.content.muted}
              />
            </IconButton>
          </Link>
        </Header.Actions>
      </Header.Root>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {providers.map((provider) => (
          <Animated.View
            key={provider.id}
            entering={FadeInRight}
            exiting={FadeOutRight}
            layout={LinearTransition}
          >
            <TouchableScaleOpacity
              onLongPress={() => {
                ExpoHaptics.impactAsync(ExpoHaptics.ImpactFeedbackStyle.Heavy);

                if (Platform.OS === "android") {
                  ToastAndroid.show("Abrir bottom sheet", ToastAndroid.SHORT);
                }
              }}
              onPress={() => {
                ExpoHaptics.impactAsync(ExpoHaptics.ImpactFeedbackStyle.Light);
                if (Platform.OS === "android") {
                  ToastAndroid.show("Abrir página", ToastAndroid.SHORT);
                }
              }}
            >
              <View style={styles.provider}>
                <View style={styles.providerIconContainer} />

                <View style={styles.providerContent}>
                  <Text style={styles.label}>{provider.name}</Text>
                  <Text style={styles.value}>{provider.account}</Text>
                </View>
              </View>
            </TouchableScaleOpacity>
          </Animated.View>
        ))}
      </ScrollView>

      <Button title="Adicionar" onPress={handleAddProvider} />
      <Button color="red" title="Remove" onPress={handleRemoveProvider} />
    </View>
  );
}
