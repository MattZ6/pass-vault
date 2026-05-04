import { Link, Stack } from "expo-router";
import { Pressable, ScrollView, Text, useColorScheme } from "react-native";

import { ToolbarActions } from "@/components/toolbar-actions";

export default function HomePage() {
  const colorScheme = useColorScheme();

  return (
    <>
      <Stack.Screen.Title large>Pass Vault</Stack.Screen.Title>

      <ToolbarActions />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16 }}
      >
        <Text
          style={{
            color: colorScheme === "dark" ? "#ffffff" : "#171717",
          }}
        >
          Home screen
        </Text>

        <Link href={`/credentials/new`} asChild>
          <Pressable>
            <Text
              style={{
                color: colorScheme === "dark" ? "#ffffff" : "#171717",
                padding: 16,
                borderRadius: 12,
                backgroundColor: "#ffffff15",
              }}
            >
              Create credential
            </Text>
          </Pressable>
        </Link>

        <Link href={`/credentials/x`} asChild>
          <Pressable>
            <Text
              style={{
                color: colorScheme === "dark" ? "#ffffff" : "#171717",
                padding: 16,
                borderRadius: 12,
                backgroundColor: "#ffffff15",
              }}
            >
              View credential X
            </Text>
          </Pressable>
        </Link>
      </ScrollView>
    </>
  );
}
