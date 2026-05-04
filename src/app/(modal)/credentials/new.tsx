import {
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  useColorScheme,
  View,
} from "react-native";

import { colors } from "@/styles/themes/colors/dark";

export default function NewCredentialPage() {
  const colorScheme = useColorScheme();

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16 }}
      >
        <View>
          <Text
            style={{
              color: colorScheme === "dark" ? "#ffffff" : "#171717",
              fontSize: 24,
              lineHeight: 36,
              fontWeight: "bold",
            }}
          >
            Create credential
          </Text>

          <TextInput placeholder="Username / E-mail" />

          <TextInput placeholder="Password" secureTextEntry />

          <Pressable>
            <View
              style={{
                height: 44,
                borderRadius: 8,
                backgroundColor: colors.mauve12,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  lineHeight: 24,
                  fontWeight: "bold",
                  color: colors.mauve1,
                }}
              >
                Save
              </Text>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
