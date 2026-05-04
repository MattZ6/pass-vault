import { Stack } from "expo-router";
import { ScrollView, Text, View } from "react-native";

export default function SettingsPage() {
  return (
    <>
      <Stack.Screen.Title>Settings</Stack.Screen.Title>

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16 }}
      >
        <View>
          <Text style={{ color: "#ffffff" }}>This is the settings screen</Text>
        </View>
      </ScrollView>
    </>
  );
}
