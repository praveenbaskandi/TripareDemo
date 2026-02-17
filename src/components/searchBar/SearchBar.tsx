import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

interface SearchBarProps {
  search: string;
  setSearch: (text: string) => void;
}

export const SearchBar = ({ search, setSearch }: SearchBarProps) => {
  const flavor = useColorScheme() ?? "light";
  const theme = Colors[flavor];

  return (
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
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingHorizontal: 12,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
});
