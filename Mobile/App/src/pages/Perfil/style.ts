import { StyleSheet } from "react-native";
import { THEME } from "../../assets/THEME";

export const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        backgroundColor: THEME.COLORS.white,
        paddingBottom: 40
    },
    header: {
        width: '100%',
        height: 240,
        backgroundColor: '#00BC7D',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderEndEndRadius: 20,
        borderStartEndRadius : 20,
    },
    Caroussel:{
        bottom: 36,
        height: 250,
        width: '100%',
    },
    iconBox:{
        width: '100%',
        top: 20,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    imageTitle:{
        right: 5,
        alignItems: 'center',
        height: 145,
        justifyContent: 'space-between',
        marginTop: 5
    },
    titleEditLogoutView:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '60%'
    },
    editLogout:{
        flexDirection: 'row',
        alignItems: 'center',
        width: 70,
        gap: 10,
        justifyContent: 'space-between',
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
        width: '90%',
        
    },
    hidden:{
        marginTop:20
    }
})