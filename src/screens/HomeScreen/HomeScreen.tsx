import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./HomeScreen.styles";
import { FilterBar } from "./launch/FilterBar";
import LaunchList from "./launch/LaunchList";
import { useHomeScreenLogic } from "./useHomeScreenLogic";

export default function HomeScreen() {
  const { theme, launches, isLoading, isSyncing, handleRefresh, handlePress } =
    useHomeScreenLogic();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
      edges={["top"]}
    >
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
