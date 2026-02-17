import { BBox, GeoJsonProperties } from 'geojson';
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import useSupercluster from 'use-supercluster';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/use-color-scheme';
import { Launchpad } from '../../types';

interface ClusterMapProps {
    launchpads: Launchpad[];
    onMarkerPress: (launchpadId: string) => void;
}

const INITIAL_REGION = {
    latitude: 28.5623,
    longitude: -80.5774,
    latitudeDelta: 40,
    longitudeDelta: 40,
};

export const ClusterMap = ({ launchpads, onMarkerPress }: ClusterMapProps) => {
    const flavor = useColorScheme() ?? 'light';
    const theme = Colors[flavor];
    const mapRef = useRef<MapView>(null);
    const [bounds, setBounds] = useState<BBox | undefined>(undefined);
    const [zoom, setZoom] = useState(1);

    // 1. Convert launchpads to GeoJSON points
    const points = launchpads.map((lp) => ({
        type: 'Feature' as const,
        properties: { cluster: false, launchpadId: lp.id, ...lp },
        geometry: {
            type: 'Point' as const,
            coordinates: [lp.longitude, lp.latitude],
        },
    }));

    // 2. Get clusters
    const { clusters, supercluster } = useSupercluster({
        points,
        bounds,
        zoom,
        options: { radius: 75, maxZoom: 20 },
    });

    // 3. Update bounds/zoom on map change
    const updateMapState = (region: Region) => {
        // Calculate zoom level
        // log2(360 * ((screenWidth/256) / region.longitudeDelta)) + 1
        // Approximate zoom level based on longitudeDelta
        const newZoom = Math.round(Math.log(360 / region.longitudeDelta) / Math.LN2);
        setZoom(newZoom);

        // Calculate bbox
        // [minLon, minLat, maxLon, maxLat]
        const minLon = region.longitude - region.longitudeDelta / 2;
        const minLat = region.latitude - region.latitudeDelta / 2;
        const maxLon = region.longitude + region.longitudeDelta / 2;
        const maxLat = region.latitude + region.latitudeDelta / 2;
        setBounds([minLon, minLat, maxLon, maxLat]);
    };

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={INITIAL_REGION}
                onRegionChangeComplete={updateMapState}
                userInterfaceStyle={flavor}
            >
                {clusters.map((cluster) => {
                    const [longitude, latitude] = cluster.geometry.coordinates;
                    const { cluster: isCluster, point_count: pointCount } = cluster.properties as GeoJsonProperties & { cluster: boolean; point_count: number };

                    if (isCluster) {
                        return (
                            <Marker
                                key={`cluster-${cluster.id}`}
                                coordinate={{ latitude, longitude }}
                                onPress={() => {
                                    const expansionZoom = Math.min(
                                        supercluster?.getClusterExpansionZoom(cluster.id as number) ?? 20,
                                        20
                                    );
                                    mapRef.current?.animateCamera({
                                        center: { latitude, longitude },
                                        zoom: expansionZoom,
                                    });
                                }}
                            >
                                <View style={[styles.clusterMarker, { backgroundColor: theme.tint, borderColor: theme.background }]}>
                                    <Text style={styles.clusterText}>{pointCount}</Text>
                                </View>
                            </Marker>
                        );
                    }

                    // Not a cluster, single marker
                    const launchpadId = cluster.properties?.launchpadId;
                    return (
                        <Marker
                            key={`launchpad-${launchpadId}`}
                            coordinate={{ latitude, longitude }}
                            onPress={() => onMarkerPress(launchpadId)}
                        >
                            <View style={[styles.marker, { backgroundColor: theme.card, borderColor: theme.success }]}>
                                <Text style={{ fontSize: 20 }}>🚀</Text>
                            </View>
                        </Marker>
                    );
                })}
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    clusterMarker: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
    },
    clusterText: {
        color: Colors.light.white,
        fontWeight: 'bold',
    },
    marker: {
        padding: 4,
        borderRadius: 8,
        borderWidth: 1,
        backgroundColor: Colors.light.white,
    },
});
