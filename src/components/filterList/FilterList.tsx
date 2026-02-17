import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/use-color-scheme";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

export interface FilterOption {
  label: string;
  value: string;
}

interface FilterListProps {
  options: FilterOption[];
  activeFilter: string;
  onFilterPress: (filter: string) => void;
}

export const FilterList = ({
  options,
  activeFilter,
  onFilterPress,
}: FilterListProps) => {
  const flavor = useColorScheme() ?? "light";
  const theme = Colors[flavor];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.filterScroll}
    >
      {options.map((option) => {
        const isActive = activeFilter === option.value;
        return (
          <TouchableOpacity
            key={option.value}
            onPress={() => onFilterPress(option.value)}
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
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
