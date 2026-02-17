import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LaunchList from "../HomeScreen/launch/LaunchList";
import { styles } from "./BookmarksScreen.styles";
import { useBookmarksScreenLogic } from "./useBookmarksScreenLogic";

export default function BookmarksScreen() {
  const {
    theme,
    bookmarkedLaunches,
    isLoading,
    isRefetching,
    handleRefresh,
    handlePress,
  } = useBookmarksScreenLogic();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
      edges={["top"]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Bookmarks</Text>
      </View>

      {isLoading && !bookmarkedLaunches.length ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={theme.tint} />
        </View>
      ) : bookmarkedLaunches.length === 0 ? (
        <View style={styles.center}>
          <Text style={{ color: theme.icon, fontSize: 16 }}>
            No bookmarks yet.
          </Text>
        </View>
      ) : (
        <LaunchList
          launches={bookmarkedLaunches}
          onLaunchPress={handlePress}
          onRefresh={handleRefresh}
          refreshing={isRefetching}
        />
      )}
    </SafeAreaView>
  );
}

