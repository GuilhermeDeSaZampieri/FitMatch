import { StyleSheet } from "react-native";
import { THEME } from "../../assets/THEME";

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        backgroundColor: THEME.COLORS.white,
        paddingBottom: 70
    },
    header:{
        marginTop: 50,
        height: 32,
        width: '87%',
        gap: 120,
        alignItems: "center",
        flexDirection: 'row',
        marginBottom: 30
    },
    recomends:{
        marginTop: 15,
        width: '85%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        right: 10,
        height: 33,
    },
    comunityActivities:{
        width: '90%'
    },
    hidden:{
        marginTop:20
    }
})