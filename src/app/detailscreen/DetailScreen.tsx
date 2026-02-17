import { Tabs } from "@/constants/Constants";
import { Strings } from "@/constants/Strings";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./DetailScreen.styles";
import { LaunchpadTab } from "./LaunchpadTab";
import { MediaTab } from "./MediaTab";
import { OverviewTab } from "./OverviewTab";
import { useDetailScreenLogic } from "./useDetailScreenLogic";

export default function DetailScreen() {
  const {
    launch,
    launchpad,
    activeTab,
    setActiveTab,
    isBookmarked,
    toggleBookmark,
    theme,
  } = useDetailScreenLogic();

  if (!launch)
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Stack.Screen options={{ title: Strings.general.loading }} />
        <View style={styles.loadingContainer}>
          <Text style={{ color: theme.text }}>{Strings.general.loading}</Text>
        </View>
      </View>
    );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Stack.Screen
        options={{
          headerTitle: launch.name,
          headerRight: () => (
            <TouchableOpacity onPress={() => toggleBookmark(launch.id)}>
              <Ionicons
                name={isBookmarked ? "bookmark" : "bookmark-outline"}
                size={24}
                color={theme.tint}
              />
            </TouchableOpacity>
          ),
        }}
      />



      {/* Tabs */}
      <View style={[styles.tabBar, { borderBottomColor: theme.border }]}>
        {[
          Tabs.OVERVIEW,
          Tabs.LAUNCHPAD,
          Tabs.MEDIA,
        ].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              activeTab === tab && {
                borderBottomColor: theme.tint,
                borderBottomWidth: 2,
              },
            ]}
            onPress={() => setActiveTab(tab as any)}
          >
            <Text
              style={[
                styles.tabText,
                { color: activeTab === tab ? theme.tint : theme.icon },
              ]}
            >
              {Strings.details.tabs[tab as keyof typeof Strings.details.tabs]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {activeTab === Tabs.OVERVIEW && (
          <OverviewTab launch={launch} theme={theme} />
        )}

        {activeTab === Tabs.LAUNCHPAD && launchpad && (
          <LaunchpadTab launchpad={launchpad} theme={theme} />
        )}

        {activeTab === Tabs.MEDIA && (
          <MediaTab launch={launch} theme={theme} />
        )}
      </ScrollView>
    </View>
  );
}
