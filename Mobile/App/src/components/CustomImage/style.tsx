import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  imgProfileNavBar: {
    width: 58,
    height: 58,
    borderRadius: 24,
  },

  imgActivity: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  imgCreateActivity:{
    height: 150,
    width: 350,
    borderRadius: 20,
  },
  imgCategory: {
    width: 61,
    height: 61,
    borderRadius: 30.5, 
  },

  imgPreferences: {
    width: 112,
    height: 112,
    borderRadius: 56,
  },

  imgProfile: {
    width: 104,
    height: 104,
    borderRadius: 52,
  },

  imgEditProfile: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },

  imgModal: {
    width: '100%',
    height: '100%',
  },

  imgParticipants: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
});
