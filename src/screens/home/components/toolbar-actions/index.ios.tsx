import { Stack, useRouter } from "expo-router";
import { useCallback } from "react";

export function ToolbarActions() {
  const router = useRouter();

  const handleNavigateToSettings = useCallback(() => {
    router.push("/settings");
  }, [router.push]);

  const handleNavigateToNewCredential = useCallback(() => {
    router.push("/credentials/new");
  }, [router.push]);

  return (
    <>
      <Stack.Toolbar placement="left">
        <Stack.Toolbar.Button
          accessibilityLabel="Navigate to settings page"
          onPress={handleNavigateToSettings}
        >
          <Stack.Toolbar.Icon sf="ellipsis" />
        </Stack.Toolbar.Button>
      </Stack.Toolbar>

      <Stack.Toolbar placement="right">
        <Stack.Toolbar.Button
          accessibilityLabel="Create a new credential"
          onPress={handleNavigateToNewCredential}
        >
          <Stack.Toolbar.Icon sf="plus" />
        </Stack.Toolbar.Button>
      </Stack.Toolbar>
    </>
  );
}
