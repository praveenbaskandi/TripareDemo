import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useLaunchpads, useSyncLaunchpads } from "@/hooks/useLaunches";
import { showAlert } from "@/utils/alert";
import { useEffect } from "react";

export const useMapScreenLogic = () => {
    const flavor = useColorScheme() ?? "light";
    const theme = Colors[flavor];

    const { data: launchpads, isLoading } = useLaunchpads();
    const { mutate: sync } = useSyncLaunchpads();

    useEffect(() => {
        sync();
    }, [sync]);

    const handleMarkerPress = (id: string) => {
        const pad = launchpads?.find((l) => l.id === id);
        if (pad) {
            showAlert(
                pad.full_name,
                `${pad.details}\n\nSuccessful Launches: ${pad.launch_successes}`,
            );
        }
    };

    return {
        theme,
        launchpads,
        isLoading,
        handleMarkerPress,
    };
};
