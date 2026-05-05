import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import type { ReactNode } from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";

import { useTheme } from "@/hooks/use-theme";

import { LanguageProvider } from "./Language";
import { ThemeProvider } from "./theme";

type Props = {
  children: ReactNode;
};

const queryClient = new QueryClient();

export function Provider(props: Props) {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <GestureHandlerRootView style={styles.fill}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <LanguageProvider>
              <NavigationProvider {...props} />
            </LanguageProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
});

type NavigationProviderProps = {
  children: ReactNode;
};

function NavigationProvider({ children }: NavigationProviderProps) {
  const { resolvedThemeOption } = useTheme();

  return (
    <NavigationThemeProvider
      value={resolvedThemeOption === "dark" ? DarkTheme : DefaultTheme}
    >
      <StatusBar
        animated
        style={resolvedThemeOption === "dark" ? "light" : "dark"}
      />
      {children}
    </NavigationThemeProvider>
  );
}
