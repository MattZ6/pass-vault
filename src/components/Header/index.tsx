import { theme } from "@/theme";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from '@expo/vector-icons/AntDesign'
import { Link } from "expo-router";

export function Header() {
  const insets = useSafeAreaInsets()

  return (
    <View style={[styles.header, { paddingTop: styles.header.padding + insets.top }]} >
      <Text style={styles.text}>PassVault</Text>

      <Link href="/settings" asChild>
        <Pressable>
          <Icon name="setting" size={24} color={theme.colors.mauve11} />
        </Pressable>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,

    padding: 16,

    borderBottomWidth: 1,
    borderBottomColor: theme.colors.mauve6,
  },
  text: {
    fontFamily: theme.fonts.family.bold,
    fontSize: theme.fonts.size.heading.lg,
    color: theme.colors.mauve12,
  }
})
