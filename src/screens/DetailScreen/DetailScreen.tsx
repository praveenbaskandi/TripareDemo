import { Tabs } from "@/constants/Constants";
import { Strings } from "@/constants/Strings";
import { RootStackParamList } from "@/navigation/AppNavigator";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./DetailScreen.styles";
import { LaunchpadTab } from "./LaunchpadTab/LaunchpadTab";
import { MediaTab } from "./MediaTab/MediaTab";
import { OverviewTab } from "./OverviewTab/OverviewTab";
import { useDetailScreenLogic } from "./useDetailScreenLogic";

export default function DetailScreen() {
  const route = useRoute<RouteProp<RootStackParamList, "Detail">>();
  const navigation = useNavigation();
  const { id } = route.params;

  const {
    launch,
    launchpad,
    activeTab,
    setActiveTab,
    isBookmarked,
    toggleBookmark,
    theme,
  } = useDetailScreenLogic(id);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: launch?.name || Strings.general.loading,
      headerRight: () =>
        launch ? (
          <TouchableOpacity onPress={() => toggleBookmark(launch.id)}>
            <Ionicons
              name={isBookmarked ? "bookmark" : "bookmark-outline"}
              size={24}
              color={theme.tint}
            />
          </TouchableOpacity>
        ) : null,
    });
  }, [navigation, launch, isBookmarked, theme, toggleBookmark]);

  if (!launch)
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.loadingContainer}>
          <Text style={{ color: theme.text }}>{Strings.general.loading}</Text>
        </View>
      </View>
    );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Tabs */}
      <View style={[styles.tabBar, { borderBottomColor: theme.border }]}>
        {[Tabs.OVERVIEW, Tabs.LAUNCHPAD, Tabs.MEDIA].map((tab) => (
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

        {activeTab === Tabs.MEDIA && <MediaTab launch={launch} theme={theme} />}
      </ScrollView>
    </View>
  );
}
