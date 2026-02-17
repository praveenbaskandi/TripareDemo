import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../constants/Colors";
import { FilterConstants } from "../../constants/Constants";
import { useColorScheme } from "../../hooks/use-color-scheme";
import { useFilterStore } from "../../store";

const filters = [
  { label: "All", value: FilterConstants.ALL },
  { label: "Upcoming", value: FilterConstants.UPCOMING },
  { label: "Success", value: FilterConstants.SUCCESS },
  { label: "Failure", value: FilterConstants.FAILURE },
];

export const FilterBar = () => {
  const { search, setSearch, success, upcoming, setSuccess, setUpcoming } =
    useFilterStore();
  const flavor = useColorScheme() ?? "light";
  const theme = Colors[flavor];

  const activeFilter = upcoming
    ? FilterConstants.UPCOMING
    : success === true
      ? FilterConstants.SUCCESS
      : success === false
        ? FilterConstants.FAILURE
        : FilterConstants.ALL;

  const handleFilterPress = (filter: string) => {
    switch (filter) {
      case FilterConstants.ALL:
        setSuccess(null);
        setUpcoming(null);
        break;
      case FilterConstants.UPCOMING:
        setSuccess(null);
        setUpcoming(true);
        break;
      case FilterConstants.SUCCESS:
        setSuccess(true);
        setUpcoming(null); // Usually upcoming are not success/failure yet
        break;
      case FilterConstants.FAILURE:
        setSuccess(false);
        setUpcoming(null);
        break;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View
        style={[
          styles.searchContainer,
          { backgroundColor: theme.card, borderColor: theme.border },
        ]}
      >
        <Ionicons
          name="search"
          size={20}
          color={theme.icon}
          style={{ marginRight: 8 }}
        />
        <TextInput
          placeholder="Search missions..."
          placeholderTextColor={theme.icon}
          style={[styles.input, { color: theme.text }]}
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch("")}>
            <Ionicons name="close-circle" size={20} color={theme.icon} />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterScroll}
      >
        {filters.map((f) => {
          const isActive = activeFilter === f.value;
          return (
            <TouchableOpacity
              key={f.value}
              onPress={() => handleFilterPress(f.value)}
              style={[
                styles.chip,
                {
                  backgroundColor: isActive ? theme.tint : theme.card,
                  borderColor: isActive ? theme.tint : theme.border,
                },
              ]}
            >
              <Text
                style={{
                  color: isActive ? theme.white : theme.text,
                  fontWeight: isActive ? "bold" : "normal",
                }}
              >
                {f.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    paddingHorizontal: 12,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  filterScroll: {
    paddingHorizontal: 16,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
});
