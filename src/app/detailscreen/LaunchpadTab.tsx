import { Button } from "@/components/button/Button";
import { Strings } from "@/constants/Strings";
import { Launchpad } from "@/types";
import { Linking, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { styles } from "./DetailScreen.styles";

interface LaunchpadTabProps {
  launchpad: Launchpad;
  theme: any;
}

export const LaunchpadTab = ({ launchpad, theme }: LaunchpadTabProps) => {
  return (
    <View>
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          {launchpad.full_name}
        </Text>
        <Text style={[styles.bodyText, { color: theme.icon }]}>
          {launchpad.locality}, {launchpad.region}
        </Text>
        <Text style={[styles.bodyText, { color: theme.text, marginTop: 8 }]}>
          {launchpad.details}
        </Text>
        <Text style={[styles.bodyText, { color: theme.icon, marginTop: 8 }]}>
          Attempts: {launchpad.launch_attempts} | Successes:{" "}
          {launchpad.launch_successes}
        </Text>
      </View>

      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: launchpad.latitude,
            longitude: launchpad.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Marker
            coordinate={{
              latitude: launchpad.latitude,
              longitude: launchpad.longitude,
            }}
            title={launchpad.name}
          />
        </MapView>
      </View>

      <Button
        onPress={() =>
          Linking.openURL(
            `maps://app?daddr=${launchpad.latitude},${launchpad.longitude}`,
          )
        }
        title={Strings.details.getDirections}
        theme={theme}
      />
    </View>
  );
};
