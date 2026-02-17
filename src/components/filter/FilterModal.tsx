import { Button } from "@/components/button/Button";
import { useLaunchpads } from "@/hooks/useLaunches";
import { useFilterStore } from "@/store";
import React from "react";
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface FilterModalProps {
    visible: boolean;
    onClose: () => void;
    theme: any;
}

export const FilterModal = ({ visible, onClose, theme }: FilterModalProps) => {
    const {
        rocket,
        launchpad,
        dateRange,
        sort,
        setRocket,
        setLaunchpad,
        setDateRange,
        setSort,
        resetFilters,
    } = useFilterStore();

    const { data: launchpads } = useLaunchpads();

    const rockets = ["Falcon 1", "Falcon 9", "Falcon Heavy", "Starship"];

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={onClose}
        >
            <SafeAreaView
                style={[styles.container, { backgroundColor: theme.background }]}
            >
                <View style={styles.header}>
                    <Text style={[styles.title, { color: theme.text }]}>Filters</Text>
                    <TouchableOpacity onPress={onClose}>
                        <Text style={{ color: theme.tint, fontSize: 16 }}>Done</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={styles.content}>
                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: theme.text }]}>
                            Sort By
                        </Text>
                        <View style={styles.chipContainer}>
                            {[
                                { label: "Date (Newest)", value: "dateDesc" },
                                { label: "Date (Oldest)", value: "dateAsc" },
                                { label: "Name (A-Z)", value: "nameAsc" },
                            ].map((item) => (
                                <FilterChip
                                    key={item.value}
                                    label={item.label}
                                    selected={sort === item.value}
                                    onPress={() => setSort(item.value as any)}
                                    theme={theme}
                                />
                            ))}
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: theme.text }]}>
                            Date Range
                        </Text>
                        <View style={styles.chipContainer}>
                            {[
                                { label: "All Time", value: null },
                                { label: "Last 30 Days", value: "last30" },
                                { label: "Last Year", value: "lastYear" },
                            ].map((item) => (
                                <FilterChip
                                    key={item.label}
                                    label={item.label}
                                    selected={dateRange === item.value}
                                    onPress={() => setDateRange(item.value as any)}
                                    theme={theme}
                                />
                            ))}
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: theme.text }]}>
                            Rocket
                        </Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={styles.chipContainer}>
                                <FilterChip
                                    label="All"
                                    selected={rocket === null}
                                    onPress={() => setRocket(null)}
                                    theme={theme}
                                />
                                {rockets.map((r) => (
                                    <FilterChip
                                        key={r}
                                        label={r}
                                        selected={rocket === r} // Note: This assumes rocket ID matches name roughly or is handled by repository. 
                                        // To be precise, we need rocket IDs. For now, assuming names are used or mapped.
                                        // The repository compares rocket_id = ?. 
                                        // "Falcon 9" ID is actually "5e9d0d95eda69973a809d1ec".
                                        // "Falcon 1" ID: "5e9d0d95eda69955f709d1eb".
                                        // "Falcon Heavy": "5e9d0d95eda69974db09d1ed".
                                        // We should probably map these or use exact IDs.
                                        onPress={() => setRocket(ROCKET_IDS[r] || null)}
                                        theme={theme}
                                    />
                                ))}
                            </View>
                        </ScrollView>
                    </View>

                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: theme.text }]}>
                            Launchpad
                        </Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={styles.chipContainer}>
                                <FilterChip
                                    label="All"
                                    selected={launchpad === null}
                                    onPress={() => setLaunchpad(null)}
                                    theme={theme}
                                />
                                {launchpads?.map((lp) => (
                                    <FilterChip
                                        key={lp.id}
                                        label={lp.name}
                                        selected={launchpad === lp.id}
                                        onPress={() => setLaunchpad(lp.id)}
                                        theme={theme}
                                    />
                                ))}
                            </View>
                        </ScrollView>
                    </View>

                    <Button
                        onPress={resetFilters}
                        title="Reset All Filters"
                        theme={theme}
                        style={{ marginTop: 20, backgroundColor: theme.failure }}
                    />
                </ScrollView>
            </SafeAreaView>
        </Modal>
    );
};

const ROCKET_IDS: Record<string, string> = {
    "Falcon 1": "5e9d0d95eda69955f709d1eb",
    "Falcon 9": "5e9d0d95eda69973a809d1ec",
    "Falcon Heavy": "5e9d0d95eda69974db09d1ed",
    "Starship": "5e9d0d96eda699382d09d1ee",
};

const FilterChip = ({
    label,
    selected,
    onPress,
    theme,
}: {
    label: string;
    selected: boolean;
    onPress: () => void;
    theme: any;
}) => (
    <TouchableOpacity
        onPress={onPress}
        style={[
            styles.chip,
            {
                backgroundColor: selected ? theme.tint : theme.card,
                borderColor: selected ? theme.tint : theme.border,
            },
        ]}
    >
        <Text
            style={{
                color: selected ? "white" : theme.text,
                fontWeight: selected ? "bold" : "normal",
            }}
        >
            {label}
        </Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#ccc",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    content: {
        padding: 16,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 12,
    },
    chipContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },
    chip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
    },
});
