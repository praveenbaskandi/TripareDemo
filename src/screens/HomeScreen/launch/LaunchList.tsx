import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Launch } from "@/types";
import { formatLaunchHeaderDate } from "@/utils/commonfunction";
import { FlashList } from "@shopify/flash-list";
import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import LaunchItem from "./LaunchItem";

interface LaunchListProps {
  launches: Launch[];
  onLaunchPress: (id: string) => void;
  onRefresh: () => void;
  refreshing: boolean;
}

const LaunchList = ({
  launches,
  onLaunchPress,
  onRefresh,
  refreshing,
}: LaunchListProps) => {
  const flavor = useColorScheme() ?? "light";
  const theme = Colors[flavor];

  // Transform data for sticky headers
  const data = useMemo(() => {
    const grouped: (string | Launch)[] = [];
    let lastHeader = "";

    launches.forEach((launch) => {
      const date = new Date(launch.date_unix * 1000);
      const header = formatLaunchHeaderDate(date);

      if (header !== lastHeader) {
        grouped.push(header);
        lastHeader = header;
      }
      grouped.push(launch);
    });

    return grouped;
  }, [launches]);

  const stickyHeaderIndices = useMemo(() => {
    return data
      .map((item, index) => (typeof item === "string" ? index : null))
      .filter((item) => item !== null) as number[];
  }, [data]);

  const renderItem = ({ item }: { item: string | Launch }) => {
    if (typeof item === "string") {
      return (
        <View style={[styles.header, { backgroundColor: theme.background }]}>
          <Text style={[styles.headerText, { color: theme.tint }]}>{item}</Text>
        </View>
      );
    }
    return <LaunchItem launch={item} onPress={onLaunchPress} />;
  };

  return (
    <FlashList<string | Launch>
      data={data}
      renderItem={renderItem}
      estimatedItemSize={100}
      stickyHeaderIndices={stickyHeaderIndices}
      getItemType={(item) => (typeof item === "string" ? "header" : "row")}
      onRefresh={onRefresh}
      refreshing={refreshing}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    opacity: 0.95,
  },
  headerText: {
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});

export default LaunchList;
