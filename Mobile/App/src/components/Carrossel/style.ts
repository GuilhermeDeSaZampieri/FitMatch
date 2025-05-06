import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        width: '95%',
        height: '100%',
        backgroundColor: 'rgba(105,105,105,0.1)',
        borderRadius: 30,
        alignItems: 'center'
    },
    iconContainer: {
        width: '90%',
        height: 20,
        marginLeft: 5,
        marginTop: 20,
        marginBottom: 10,
        justifyContent: 'center'
    },

    row: {
        width: '93%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    PointsNextLevel:{
        left: 10,
    },
    points:{
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 3
    },

    progressContainer: {
        flexDirection: 'row',
        marginLeft: 10,
        bottom: 10,
      },
      progressBar: {
        width: "95%",
        height: 6,
        backgroundColor: '#e0e0e0',
        borderRadius: 4,
        overflow: 'hidden',
        marginRight: 8,
      },
      progressFill: {
        height: '100%',
        backgroundColor: '#000000', 
      },

    level:{
        height: 60,
        marginTop: 10,
        justifyContent: 'center',
        gap: 15,
        width: 100,
        marginLeft: 15

    }
});