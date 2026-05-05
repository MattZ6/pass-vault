import { Link, Stack } from "expo-router";
import { SymbolView } from "expo-symbols";
import { Platform, Pressable, ScrollView, View } from "react-native";
import { Text } from "@/components/ui/text";
import { useStyles } from "@/hooks/use-styles";
import { ToolbarActions } from "./components/toolbar-actions";
import { getStyles } from "./styles";

export function HomeScreen() {
  const { styles, theme } = useStyles(getStyles);

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
        Pass Vault
      </Stack.Screen.Title>

      <ToolbarActions />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}
      >
        <Text color="muted">Here goes the credentials list.</Text>

        <Link href={`/credentials/example-id`} asChild>
          <Pressable
            android_disableSound
            android_ripple={theme.colors.androidRipple}
          >
            <View
              style={{
                paddingVertical: theme.spacing[4],
                flexDirection: "row",
                alignItems: "center",
                gap: theme.spacing[4],
              }}
            >
              <View
                style={{
                  flex: 1,
                }}
              >
                <Text>Credential example</Text>
                <Text typography="bodySmall" color="muted">
                  This is an example of a credential
                </Text>
              </View>

              <SymbolView
                name={{ android: "chevron_right", ios: "chevron.right" }}
                size={Platform.select({
                  ios: 16,
                  default: 24,
                })}
                tintColor={theme.colors.content.muted}
              />
            </View>
          </Pressable>
        </Link>
      </ScrollView>
    </>
  );
}
