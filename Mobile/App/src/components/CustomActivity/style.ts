import {StyleSheet} from 'react-native';
import {THEME} from '../../assets/THEME';

export const styles = StyleSheet.create({
  
  flatList:{
    maxHeight: 460,
    marginTop: 15,
    marginBottom: 20
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
 
  container: {
    width: 338,
    height: 228,
    alignItems: 'center',
    marginBottom: 10,
    left: 20
  },

  rowContainer: {
    marginHorizontal: 15,
    width: 370, 
  },

  box: {
    width: '100%',
    marginVertical: 15,
    height: 52,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  descImg: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  backLock: {
    left: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 17,
    height: 28,
    width: 34,
    backgroundColor: THEME.COLORS.green,
    position: 'absolute',
    margin: 8
  },

});
