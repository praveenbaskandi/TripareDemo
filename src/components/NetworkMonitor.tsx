import { LaunchRepository } from "@/data/repository";
import { useSyncStore } from "@/store";
import NetInfo from "@react-native-community/netinfo";
import { useEffect } from "react";

export const NetworkMonitor = () => {
    const { setIsOffline, setLastSyncTime } = useSyncStore();

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            const offline = state.isConnected === false;
            setIsOffline(offline);

            if (!offline) {
                // Trigger sync when back online
                console.log("Network restored, syncing data...");
                (async () => {
                    try {
                        await LaunchRepository.syncLaunches();
                        await LaunchRepository.syncLaunchpads();
                        setLastSyncTime(Date.now());
                    } catch (err) {
                        console.error("Auto-sync failed:", err);
                    }
                })();
            }
        });

        return () => unsubscribe();
    }, [setIsOffline, setLastSyncTime]);

    return null; // Logic-only component
};
