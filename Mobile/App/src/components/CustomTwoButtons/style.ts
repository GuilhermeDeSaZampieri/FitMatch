import { StyleSheet } from "react-native";
import { THEME } from "../../assets/THEME";

export const styles = StyleSheet.create({
    container:{
        height: 70,
    },
    radioGroup: {
      flexDirection: 'row',
      marginTop: 10,
    },
    radioButton: {
      padding: 10,
      marginRight: 10,
      width: 100,
      height: 38,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: '#ccc',
      borderRadius: 5,
      backgroundColor: THEME.COLORS.grayBack,
    },
    radioButtonSelected: {
      backgroundColor: THEME.COLORS.black,
    },
    radioText: {
      fontSize: 12,
      color: THEME.COLORS.blackSub
    },
    textSelected:{
        color: THEME.COLORS.white
    }
  });