import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./HomeScreen.styles";
import { FilterBar } from "./launch/FilterBar";
import LaunchList from "./launch/LaunchList";
import { useHomeScreenLogic } from "./useHomeScreenLogic";

import { useSyncStore } from "@/store";
import { formatDistanceToNow } from "date-fns";

export default function HomeScreen() {
  const {
    launches,
    isLoading,
    handlePress,
    handleRefresh,
    isRefetching,
    theme,
  } = useHomeScreenLogic();

  const { isOffline, lastSyncTime } = useSyncStore();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
      edges={["top"]}
    >
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <Text style={[styles.title, { color: theme.text }]}>Launches</Text>
        <View>
          {isOffline ? (
            <Text style={{ color: theme.failure, fontSize: 12 }}>
              Offline - Cached Data
            </Text>
          ) : lastSyncTime ? (
            <Text style={{ color: theme.icon, fontSize: 12 }}>
              Synced {formatDistanceToNow(lastSyncTime)} ago
            </Text>
          ) : null}
        </View>
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
          refreshing={isRefetching}
        />
      )}
    </SafeAreaView>
  );
}
