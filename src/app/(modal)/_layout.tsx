import { Stack } from "expo-router";
import { colors } from "@/styles/themes/colors/dark";

export default function ModalLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.mauve1,
        },
      }}
    />
  );
}
