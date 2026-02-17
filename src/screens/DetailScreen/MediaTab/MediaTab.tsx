import { Button } from "@/components/button/Button";
import { Strings } from "@/constants/Strings";
import { Launch } from "@/types";
import React from "react";
import { Linking, Share, View } from "react-native";

interface MediaTabProps {
  launch: Launch;
  theme: any;
}

export const MediaTab = ({ launch, theme }: MediaTabProps) => {
  const handleShare = async () => {
    if (launch.links.webcast || launch.links.article) {
      await Share.share({
        message: `Check out the ${launch.name} mission! ${
          launch.links.webcast || ""
        }`,
      });
    }
  };

  return (
    <View>
      {launch.links.webcast && (
        <Button
          onPress={() => Linking.openURL(launch.links.webcast!)}
          title={Strings.details.watchWebcast}
          theme={theme}
          icon="logo-youtube"
          style={{ marginBottom: 12, justifyContent: "flex-start" }}
          textStyle={{ fontSize: 16 }}
        />
      )}

      {launch.links.article && (
        <Button
          onPress={() => Linking.openURL(launch.links.article!)}
          title={Strings.details.readArticle}
          theme={theme}
          icon="newspaper"
          iconColor={theme.text}
          backgroundColor={theme.card}
          textColor={theme.text}
          style={{ marginBottom: 12, justifyContent: "flex-start" }}
          textStyle={{ fontSize: 16 }}
        />
      )}

      <Button
        onPress={handleShare}
        title={Strings.details.shareMission}
        theme={theme}
        icon="share-social"
        style={{ marginTop: 20, justifyContent: "flex-start" }}
        textStyle={{ fontSize: 16 }}
      />
    </View>
  );
};
