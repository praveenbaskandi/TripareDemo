import { ClusterMap } from "@/components/map/ClusterMap";
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { styles } from "./MapScreen.styles";
import { useMapScreenLogic } from "./useMapScreenLogic";

export default function MapScreen() {
  const { theme, launchpads, isLoading, handleMarkerPress } =
    useMapScreenLogic();

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
