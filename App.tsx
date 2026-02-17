import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, LogBox, View } from "react-native";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { migrateDb, openDatabase } from "@/data/database";
import { useColorScheme } from "@/hooks/use-color-scheme";
import AppNavigator from "@/navigation/AppNavigator";

// Ignore specific warnings if needed
LogBox.ignoreLogs([]);

const queryClient = new QueryClient();

export default function App() {
  const colorScheme = useColorScheme();
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    async function initDb() {
      try {
        const db = await openDatabase();
        await migrateDb(db);
        setDbReady(true);
      } catch (e) {
        console.error("Database migration failed:", e);
        setDbReady(true);
      }
    }
    initDb();
  }, []);

  if (!dbReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <ActionSheetProvider>
          <AppNavigator />
        </ActionSheetProvider>
        <StatusBar style="auto" />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
