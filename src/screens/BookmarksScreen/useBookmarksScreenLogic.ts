import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useLaunches } from "@/hooks/useLaunches";
import { RootStackParamList } from "@/navigation/AppNavigator";
import { useBookmarkStore } from "@/store";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useMemo } from "react";

export const useBookmarksScreenLogic = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const flavor = useColorScheme() ?? "light";
  const theme = Colors[flavor];

  const { bookmarkedLaunchIds } = useBookmarkStore();
  // Fetch all launches - simplistic approach.
  // Optimization: In a real app with simplified schema or thousands of items,
  // we might want a specific query for ids, but filtering client-side is okay for <2000 items in memory if data is already there.
  const { data: allLaunches, isLoading, refetch, isRefetching } = useLaunches();

  const bookmarkedLaunches = useMemo(() => {
    if (!allLaunches) return [];
    return allLaunches.filter((launch) =>
      bookmarkedLaunchIds.includes(launch.id),
    );
  }, [allLaunches, bookmarkedLaunchIds]);

  const handlePress = (id: string) => {
    navigation.navigate("Detail", { id });
  };

  return {
    theme,
    bookmarkedLaunches,
    isLoading,
    isRefetching,
    handleRefresh: refetch,
    handlePress,
  };
};
