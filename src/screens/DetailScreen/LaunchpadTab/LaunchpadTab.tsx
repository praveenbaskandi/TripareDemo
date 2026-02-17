import { Button } from "@/components/button/Button";
import { Strings } from "@/constants/Strings";
import { Launchpad } from "@/types";
import * as Location from 'expo-location';
import { useEffect, useState } from "react";
import { Linking, Platform, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { styles } from "../DetailScreen.styles";

// Haversine formula to calculate distance
const getDistanceFromLatLonInKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1);  // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d.toFixed(1);
}

const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180)
}

interface LaunchpadTabProps {
  launchpad: Launchpad;
  theme: any;
}

export const LaunchpadTab = ({ launchpad, theme }: LaunchpadTabProps) => {
  const [distance, setDistance] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const dist = getDistanceFromLatLonInKm(
        location.coords.latitude,
        location.coords.longitude,
        launchpad.latitude,
        launchpad.longitude
      );
      setDistance(dist);
    })();
  }, [launchpad]);

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
          showsUserLocation
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

      <View style={{ gap: 10 }}>
        {distance && (
          <Text style={{ color: theme.text, textAlign: 'center', marginBottom: 5 }}>
            Distance from you: {distance} km
          </Text>
        )}
        <Button
          onPress={() => {
            const scheme = Platform.select({ ios: "maps://0,0?daddr=", android: "geo:0,0?q=" });
            const latLng = `${launchpad.latitude},${launchpad.longitude}`;
            const label = launchpad.name;
            const url = Platform.select({
              ios: `${scheme}${latLng}`,
              android: `${scheme}${latLng}(${label})`,
            });
            if (url) Linking.openURL(url);
          }}
          title={Strings.details.getDirections}
          theme={theme}
        />
      </View>
    </View>
  );
};
