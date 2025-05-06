import { StyleSheet } from "react-native";
import { THEME } from "../../assets/THEME";

export const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 12,
        lineHeight: 16,
        color: THEME.COLORS.gray,
        fontFamily: THEME.FONTS.DMSans.regular,
    },
    boldText: {
        fontFamily: THEME.FONTS.DMSans.bold,
    },
});