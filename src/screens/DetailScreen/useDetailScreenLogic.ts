import { Colors } from "@/constants/Colors";
import { Tabs } from "@/constants/Constants";
import { LaunchRepository } from "@/data/repository";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useBookmarkStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useDetailScreenLogic = (id: string) => {
  // const { id } = useLocalSearchParams<{ id: string }>(); // Removed
  const flavor = useColorScheme() ?? "light";
  const theme = Colors[flavor];
  const [activeTab, setActiveTab] = useState<string>(Tabs.OVERVIEW);

  const { data: launch } = useQuery({
    queryKey: ["launch", id],
    queryFn: async () => {
      const all = await LaunchRepository.getLaunches(0, 5000);
      return all.find((l) => l.id === id);
    },
  });

  const { data: launchpad } = useQuery({
    queryKey: ["launchpad", launch?.launchpad],
    enabled: !!launch?.launchpad,
    queryFn: () => LaunchRepository.getLaunchpadById(launch!.launchpad),
  });

  const { bookmarkedLaunchIds, toggleBookmark } = useBookmarkStore();
  const isBookmarked = bookmarkedLaunchIds.includes(id as string);

  return {
    launch,
    launchpad,
    activeTab,
    setActiveTab,
    isBookmarked,
    toggleBookmark,
    theme,
  };
};
