/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other colors that are used in the app, but these are the main ones.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#e24747";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    card: "#F8F9FA",
    border: "#E6E8EB",
    success: "#00C853",
    failure: "#D50000",
    upcoming: "#2962FF",
    white: "#fff",
    youtubeRed: "#FF0000",
  },
  dark: {
    text: "#ECEDEE",
    background: "#050B14", // Deep space blue/black
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    card: "#0D1B2A", // Darker blue card
    border: "#1B263B",
    success: "#00E676", // Neon green
    failure: "#FF1744", // Neon red
    upcoming: "#00B0FF", // Neon blue
    white: "#fff",
    youtubeRed: "#FF0000",
  },
};
