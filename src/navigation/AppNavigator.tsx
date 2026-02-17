import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/use-color-scheme";
import BookmarksScreen from "@/screens/BookmarksScreen/BookmarksScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { NetworkMonitor } from "../components/NetworkMonitor";
import DetailScreen from "../screens/DetailScreen/DetailScreen";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import MapScreen from "../screens/MapScreen/MapScreen";

export type RootStackParamList = {
  Main: undefined;
  Detail: { id: string };
};

export type MainTabParamList = {
  Home: undefined;
  Explore: undefined;
  Bookmarks: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  const flavor = useColorScheme() ?? "light";
  const theme = Colors[flavor];

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.tint,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: theme.background,
          borderTopColor: theme.border,
        },
        tabBarInactiveTintColor: theme.icon,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Launches",
          tabBarIcon: ({ color }) => (
            <IconSymbol name="house.fill" size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={MapScreen}
        options={{
          title: "Map",
          tabBarIcon: ({ color }) => (
            <IconSymbol name="map.fill" size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Bookmarks"
        component={BookmarksScreen}
        options={{
          title: "Bookmarks",
          tabBarIcon: ({ color }) => (
            <IconSymbol name={"bookmark.fill" as any} size={28} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const flavor = useColorScheme() ?? "light";
  const theme = Colors[flavor];

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.background,
      text: theme.text,
      primary: theme.tint,
      card: theme.background,
      border: theme.border,
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <NetworkMonitor />
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={MainTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{ presentation: "modal" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
