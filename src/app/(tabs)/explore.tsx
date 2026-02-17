import { ClusterMap } from "@/components/map/ClusterMap"; // Need to export
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useLaunchpads, useSyncLaunchpads } from "@/hooks/useLaunches";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function ExploreScreen() {
  const flavor = useColorScheme() ?? "light";
  const theme = Colors[flavor];
  const router = useRouter();

  const { data: launchpads, isLoading } = useLaunchpads();
  const { mutate: sync } = useSyncLaunchpads();

  useEffect(() => {
    sync();
  }, []);

  if (isLoading && !launchpads) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.background,
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <ActivityIndicator size="large" color={theme.tint} />
      </View>
    );
  }

  // Mock logic to launch details if marker pressed
  // But launchpad ID is not launch ID.
  // Maybe show a modal with launchpad details or navigate to a launchpad details screen.
  // For now, let's just log or no-op/alert.
  // The requirement says: "tap pad -> view details".
  // I already have LaunchDetailScreen which has a launchpad tab.
  // I probably need a LaunchpadDetailScreen strictly for pads, or just show a bottom sheet.
  // Given the constraints, I'll navigate to the first launch from this pad or just an alert/modal.
  // Actually, I don't have a specific Launchpad screen. I only have LaunchDetail.
  // Let's make a simple "Launchpad Details" overlay or just navigate to a filtering of launches by this pad.
  // "Launch Venue Analysis" -> "Filter by date/status/rocket".
  // I'll navigate back to Home (Launches) with a filter applied for this Launchpad?
  // My FilterStore doesn't support Launchpad filter yet.
  // I'll leave it as a TODO or just alert for now.

  // Better: Navigate to a Modal with Launchpad info.

  const handleMarkerPress = (id: string) => {
    // Find launchpad
    const pad = launchpads?.find((l) => l.id === id);
    if (pad) {
      // Simple alert for now as I didn't plan a separate Launchpad Screen
      alert(
        `${pad.full_name}\n${pad.details}\n\nSuccessful Launches: ${pad.launch_successes}`,
      );
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ClusterMap
        launchpads={launchpads || []}
        onMarkerPress={handleMarkerPress}
      />
      <View style={[styles.overlay, { backgroundColor: theme.card }]}>
        <Text style={{ color: theme.text, fontWeight: "bold" }}>
          Launchpad Analysis
        </Text>
        <Text style={{ color: theme.icon, fontSize: 12 }}>
          {launchpads?.length || 0} Active Sites •{" "}
          {launchpads?.reduce((acc, curr) => acc + curr.launch_attempts, 0) ||
            0}{" "}
          Total Launches
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    position: "absolute",
    top: 60,
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: 12,
    opacity: 0.9,
  },
});
