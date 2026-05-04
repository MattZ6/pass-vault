import { Stack } from "expo-router";
import { colors } from "@/styles/themes/colors/dark";

export default function ModalLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        contentStyle: {
          backgroundColor: colors.mauve2,
        },
      }}
    />
  );
}
