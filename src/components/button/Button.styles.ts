import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    button: {
        padding: 16,
        borderRadius: 12,
        alignItems: "center",
    },
    buttonText: {
        color: Colors.light.white,
        fontWeight: "bold",
    },
    textWithIcon: {
        marginLeft: 12,
    },
});
