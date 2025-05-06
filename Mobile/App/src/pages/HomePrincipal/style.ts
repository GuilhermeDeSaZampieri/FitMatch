import { StyleSheet } from "react-native";
import { THEME } from "../../assets/THEME";

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: THEME.COLORS.white,
        alignItems:  'center',
        paddingBottom: 100
    },
    header:{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 137,
        borderRadius: 32,
        backgroundColor: THEME.COLORS.green,
        paddingTop: 20
    },
    recomends:{
        marginTop: 50,
        width: '85%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        right: 10,
        height: 33,
    },
    createActivity:{
        position: 'absolute',
        bottom: 25,
        right: 25
    },
    buttonCreateActivity:{
        width: 60,
        height: 60,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: THEME.COLORS.green
    },
    decorativeBall1: {
        position: 'absolute',
        width: 214,
        height: 214,
        borderRadius: 107,
        backgroundColor: 'rgba(255, 255, 255, 0.15)', 
        top: -114,
        left: -69,
      },
      decorativeBall2: {
        position: 'absolute',
        width: 214,
        height: 214,
        borderRadius: 107,
        backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        top: -78,
        left: -47,
      },
    infoView:{
        width:  '85%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        height: 62,
    },
    welcomeView:{
        justifyContent: 'center',
        width: 158,
        height: '100%',

    },
    grouplvImg:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20
    },
    levelView:{
        borderWidth:1,
        width: 52,
        height: 33,
        borderRadius: 5,
        borderColor: THEME.COLORS.white,
        alignItems: 'center',
        gap: 6,
        flexDirection: 'row',
        justifyContent: 'center',
    }

})