import { Link, Stack } from "expo-router";
import { SymbolView } from "expo-symbols";
import { Platform, Pressable, View } from "react-native";

export function ToolbarActions() {
  return (
    <Stack.Toolbar placement="right" asChild={Platform.OS === "android"}>
      {Platform.OS === "android" && (
        <View>
          <Link href={{ pathname: "/settings" }} asChild>
            <Pressable
              android_disableSound
              hitSlop={{ right: 8, top: 16, left: 16, bottom: 16 }}
            >
              <SymbolView
                name={{ android: "more_vert" }}
                tintColor={"#ffffff"}
              />
            </Pressable>
          </Link>
        </View>
      )}
    </Stack.Toolbar>
  );
}
