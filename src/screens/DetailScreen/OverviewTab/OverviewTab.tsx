import { Strings } from "@/constants/Strings";
import { Launch } from "@/types";
import { formatLaunchDate } from "@/utils/commonfunction";
import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";
import { styles } from "../DetailScreen.styles";
import { SecureNotesSection } from "./SecureNotesSection";

interface OverviewTabProps {
  launch: Launch;
  theme: any; // Using any for theme to avoid complex type import unless necessary
}

export const OverviewTab = ({ launch, theme }: OverviewTabProps) => {
  return (
    <View>
      <View style={styles.headerSection}>
        {launch.links.patch.small && (
          <Image
            source={launch.links.patch.small}
            style={styles.patch}
            contentFit="contain"
          />
        )}
        <View style={styles.headerInfo}>
          <Text style={[styles.date, { color: theme.text }]}>
            {formatLaunchDate(launch.date_unix)}
          </Text>
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor: launch.success ? theme.success : theme.failure,
              },
            ]}
          >
            <Text style={styles.statusText}>
              {launch.success
                ? Strings.general.success
                : Strings.general.failure}
            </Text>
          </View>
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          {Strings.details.missionDetails}
        </Text>
        <Text style={[styles.bodyText, { color: theme.text }]}>
          {launch.details || Strings.details.noDetails}
        </Text>
      </View>

      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          {Strings.details.rocket}
        </Text>
        <Text style={[styles.bodyText, { color: theme.text }]}>
          {launch.rocket}
        </Text>
      </View>

      <SecureNotesSection launchId={launch.id} theme={theme} />
    </View>
  );
};
