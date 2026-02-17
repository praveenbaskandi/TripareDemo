import React from "react";
import { StyleSheet, View } from "react-native";
import { FilterList } from "../../../components/filterList/FilterList";
import { SearchBar } from "../../../components/searchBar/SearchBar";
import { Colors } from "../../../constants/Colors";
import { FilterConstants } from "../../../constants/Constants";
import { useColorScheme } from "../../../hooks/use-color-scheme";
import { useFilterStore } from "../../../store";

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
      <View style={{ marginHorizontal: 16 }}>
        <SearchBar search={search} setSearch={setSearch} />
      </View>

      <FilterList
        options={filters}
        activeFilter={activeFilter}
        onFilterPress={handleFilterPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
});
