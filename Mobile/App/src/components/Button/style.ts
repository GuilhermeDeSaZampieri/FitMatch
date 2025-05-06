import { StyleSheet } from "react-native";
import { THEME } from "../../assets/THEME";

export const styles = StyleSheet.create({
    label:{
        fontFamily: THEME.FONTS.DMSans.bold,
        fontSize: 16,
        lineHeight: 24
    },
    ghost:{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
        borderRadius: 4,
    },
    default:{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: THEME.COLORS.green,
        borderRadius: 4,
    },
    outline:{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: THEME.COLORS.white,
        borderColor: THEME.COLORS.greenDark,
        borderRadius: 4,
        borderWidth: 1
    },
    ghostLabel:{
        color: THEME.COLORS.black
    },
    defaultLabel:{
        color: THEME.COLORS.white
    },
    outlineLabel:{
        color: THEME.COLORS.greenDark
    }
    
})