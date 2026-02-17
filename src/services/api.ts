import { fetchWithRetry } from "@/utils/api";
import { LaunchListSchema, LaunchpadListSchema } from "@/utils/validation";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || "https://api.spacexdata.com";

export const api = {
  getLaunches: async () => {
    const response = await fetchWithRetry(`${BASE_URL}/v5/launches`);
    if (!response.ok) throw new Error(`Failed to fetch launches: ${response.status}`);
    const data = await response.json();
    return LaunchListSchema.parse(data);
  },

  getLaunchpads: async () => {
    const response = await fetchWithRetry(`${BASE_URL}/v4/launchpads`);
    if (!response.ok) throw new Error(`Failed to fetch launchpads: ${response.status}`);
    const data = await response.json();
    return LaunchpadListSchema.parse(data);
  },
};
