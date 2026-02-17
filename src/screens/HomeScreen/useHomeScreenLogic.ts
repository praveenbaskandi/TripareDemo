import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useLaunches, useSyncLaunches } from "@/hooks/useLaunches";
import { RootStackParamList } from "@/navigation/AppNavigator";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect } from "react";

export const useHomeScreenLogic = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const flavor = useColorScheme() ?? "light";
  const theme = Colors[flavor];

  const { data: launches, isLoading } = useLaunches();
  const { mutate: sync, isPending: isSyncing } = useSyncLaunches();

  useEffect(() => {
    sync();
  }, [sync]);

  const handleRefresh = useCallback(() => {
    sync();
  }, [sync]);

  const handlePress = useCallback(
    (id: string) => {
      navigation.navigate("Detail", { id });
    },
    [navigation],
  );

  return {
    theme,
    launches,
    isLoading,
    isSyncing,
    handleRefresh,
    handlePress,
  };
};
