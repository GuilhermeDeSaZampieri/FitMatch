import {StyleSheet} from 'react-native';
import {THEME} from '../../assets/THEME';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.white,
    alignItems: 'center',
    paddingBottom: 50

  },
  form: {
    width: '90%',
    marginTop: 24,
    paddingLeft: 5,
  },
  customPreference:{
    marginTop: 40,
    right: 20
  },
  Buttons:{
    height: 72,
    width: '100%',
    justifyContent: 'flex-start',
    gap: '10'
  }
});
