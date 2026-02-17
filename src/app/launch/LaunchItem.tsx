import { formatLaunchItemDate } from "@/utils/commonfunction";
import { Image } from "expo-image";
import { memo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/Colors";
import { useColorScheme } from "../../hooks/use-color-scheme";
import { Launch } from "../../types";

interface LaunchItemProps {
  launch: Launch;
  onPress: (id: string) => void;
}

const LaunchItem = memo(({ launch, onPress }: LaunchItemProps) => {
  const flavor = useColorScheme() ?? "light";
  const theme = Colors[flavor];

  const statusColor = launch.success
    ? theme.success
    : launch.success === false
      ? theme.failure
      : theme.upcoming;

  const statusText = launch.success
    ? "SUCCESS"
    : launch.success === false
      ? "FAILURE"
      : "UPCOMING";

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
          opacity: pressed ? 0.8 : 1,
        },
      ]}
      onPress={() => onPress(launch.id)}
    >
      <View style={styles.iconContainer}>
        {launch.links.patch.small ? (
          <Image
            source={launch.links.patch.small}
            style={styles.patch}
            contentFit="contain"
            cachePolicy="memory-disk"
          />
        ) : (
          <View style={[styles.placeholder, { backgroundColor: theme.border }]}>
            <Text style={{ color: theme.text }}>🚀</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text
            style={[styles.missionName, { color: theme.text }]}
            numberOfLines={1}
          >
            {launch.name}
          </Text>
          <View style={[styles.badge, { borderColor: statusColor }]}>
            <Text style={[styles.badgeText, { color: statusColor }]}>
              {statusText}
            </Text>
          </View>
        </View>

        <Text style={[styles.date, { color: theme.icon }]}>
          {formatLaunchItemDate(launch.date_unix)}
        </Text>

        {launch.details && (
          <Text
            style={[styles.details, { color: theme.icon }]}
            numberOfLines={2}
          >
            {launch.details}
          </Text>
        )}
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    height: 100, // Fixed height for best performance if possible, but details can vary
  },
  iconContainer: {
    width: 60,
    height: 60,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  patch: {
    width: 60,
    height: 60,
  },
  placeholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  missionName: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
    marginRight: 8,
  },
  badge: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "bold",
  },
  date: {
    fontSize: 12,
    marginBottom: 4,
  },
  details: {
    fontSize: 12,
    opacity: 0.8,
  },
});

export default LaunchItem;
