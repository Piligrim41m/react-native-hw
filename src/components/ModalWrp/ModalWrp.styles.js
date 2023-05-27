import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    marginHorizontal: 16,
    backgroundColor: '#FF6C00',
    borderRadius: 8,
    padding: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    marginBottom: hp('0.96%'),
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 19,
    color: '#fff',
  },
  buttonClose: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 4,
  },
  mapWrp: {
    height: hp('40%'),
    width: wp('90%'),
    borderRadius: 8,
    overflow: 'hidden',
  },
  mapStyle: {
    width: '100%',
    height: '100%',
  },
});
