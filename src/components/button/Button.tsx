import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { styles } from "./Button.styles";

interface ButtonProps {
  onPress: () => void;
  title: string;
  theme: any;
  icon?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  textColor?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const Button = ({
  onPress,
  title,
  theme,
  icon,
  iconColor,
  textColor,
  style,
  textStyle,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: theme.tint },
        icon ? { flexDirection: "row", justifyContent: "center" } : {},
        style,
      ]}
      onPress={onPress}
    >
      {icon && <Ionicons name={icon} size={24} color={iconColor || "#fff"} />}
      <Text
        style={[
          styles.buttonText,
          icon ? styles.textWithIcon : {},
          textColor ? { color: textColor } : {},
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
