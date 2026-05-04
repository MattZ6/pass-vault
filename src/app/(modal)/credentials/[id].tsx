import { Stack, useLocalSearchParams } from "expo-router";
import { ScrollView, Text, useColorScheme } from "react-native";

type Params = {
  id: string;
};

export default function CredentialDetailsPage() {
  const params = useLocalSearchParams<Params>();
  const colorScheme = useColorScheme();

  return (
    <>
      <Stack.Screen.Title>Credential details</Stack.Screen.Title>

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
          View credential {params.id}
        </Text>
      </ScrollView>
    </>
  );
}
