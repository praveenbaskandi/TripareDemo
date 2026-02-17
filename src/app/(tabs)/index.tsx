import { FilterBar } from "@/app/launch/FilterBar";
import LaunchList from "@/app/launch/LaunchList";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useLaunches, useSyncLaunches } from "@/hooks/useLaunches";
import { Routes } from "@/navigation/routes";
import { Stack, useRouter } from "expo-router";
import React, { useCallback, useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LaunchScreen() {
  const router = useRouter();
  const flavor = useColorScheme() ?? "light";
  const theme = Colors[flavor];

  const { data: launches, isLoading, refetch } = useLaunches();
  const { mutate: sync, isPending: isSyncing } = useSyncLaunches();

  useEffect(() => {
    sync();
  }, []);

  const handleRefresh = useCallback(() => {
    sync();
  }, [sync]);

  const handlePress = useCallback(
    (id: string) => {
      router.push(Routes.launchDetail(id));
    },
    [router],
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
      edges={["top"]}
    >
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>
          SpaceX Mission Control
        </Text>
      </View>

      <FilterBar />

      {isLoading && !launches ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={theme.tint} />
        </View>
      ) : (
        <LaunchList
          launches={launches || []}
          onLaunchPress={handlePress}
          onRefresh={handleRefresh}
          refreshing={isSyncing}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
