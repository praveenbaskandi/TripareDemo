import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { Platform } from "react-native";
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
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTabNavigator() {
  const flavor = useColorScheme() ?? "light";
  const theme = Colors[flavor];

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.tint,
        tabBarButton: HapticTab,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
            backgroundColor: theme.background, // Or transparent with BlurView if available, but staying safe
            borderTopColor: "transparent",
          },
          default: {
            backgroundColor: theme.background,
            borderTopColor: theme.border,
          },
        }),
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Launches",
          tabBarIcon: ({ color }) => (
            <IconSymbol name="rocket.fill" size={28} color={color} />
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
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer theme={DefaultTheme}>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="Main"
          component={MainTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{ title: "Mission Details" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
