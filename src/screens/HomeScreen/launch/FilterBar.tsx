import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { FilterModal } from "../../../components/filter/FilterModal";
import { FilterList } from "../../../components/filterList/FilterList";
import { SearchBar } from "../../../components/searchBar/SearchBar";
import { Colors } from "../../../constants/Colors";
import { FilterConstants } from "../../../constants/Constants";
import { useColorScheme } from "../../../hooks/use-color-scheme";
import { useDebounce } from "../../../hooks/useDebounce";
import { useFilterStore } from "../../../store";

const filters = [
  { label: "All", value: FilterConstants.ALL },
  { label: "Upcoming", value: FilterConstants.UPCOMING },
  { label: "Success", value: FilterConstants.SUCCESS },
  { label: "Failure", value: FilterConstants.FAILURE },
];

export const FilterBar = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { search, setSearch, success, upcoming, setSuccess, setUpcoming } = useFilterStore();
  const [localSearch, setLocalSearch] = useState(search);

  // Debounce the search term to avoid excessive re-renders/queries
  const debouncedSearch = useDebounce(localSearch, 500);

  // Sync debounced value to global store
  React.useEffect(() => {
    setSearch(debouncedSearch);
  }, [debouncedSearch, setSearch]);

  // Sync global store reset (e.g. from clear button) back to local state if needed
  // Note: If SearchBar purely uses localSearch passed as prop, this might be tricky if "clear" is inside SearchBar using setSearch directly. 
  // Let's check SearchBar again. SearchBar takes "search" and "setSearch". 
  // I should pass localSearch and setLocalSearch to SearchBar.

  const flavor = useColorScheme() ?? "light";
  const theme = Colors[flavor];

  // Update local state when global search is cleared externally (if ever)
  React.useEffect(() => {
    if (search === '' && localSearch !== '') {
      setLocalSearch('');
    }
  }, [search]);

  // ... (rest of filtering logic) ...
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
        setUpcoming(null);
        break;
      case FilterConstants.FAILURE:
        setSuccess(false);
        setUpcoming(null);
        break;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={{ marginHorizontal: 16, flexDirection: "row", gap: 12 }}>
        <View style={{ flex: 1 }}>
          <SearchBar search={localSearch} setSearch={setLocalSearch} />
        </View>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{
            height: 40,
            width: 40,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 8,
            backgroundColor: theme.card,
            borderWidth: 1,
            borderColor: theme.border,
          }}
        >
          <Ionicons name="options" size={20} color={theme.text} />
        </TouchableOpacity>
      </View>

      <FilterList
        options={filters}
        activeFilter={activeFilter}
        onFilterPress={handleFilterPress}
      />

      <FilterModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        theme={theme}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
});
