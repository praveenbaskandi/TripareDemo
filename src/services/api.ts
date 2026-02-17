const BASE_URL = "https://api.spacexdata.com";

export const api = {
  getLaunches: async () => {
    const response = await fetch(`${BASE_URL}/v5/launches`);
    if (!response.ok) throw new Error("Failed to fetch launches");
    return response.json();
  },

  getLaunchpads: async () => {
    const response = await fetch(`${BASE_URL}/v4/launchpads`);
    if (!response.ok) throw new Error("Failed to fetch launchpads");
    return response.json();
  },
};
