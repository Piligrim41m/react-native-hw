import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: hp('3.8%'),
  },
  userWrp:{
    marginBottom: hp('3.8%'),
    flexDirection: 'row',
  },
  userPhoto:{
    height: hp('7%'),
    width: hp('7%'),
    marginRight: hp('0.96%'),
    borderRadius: 16,
    backgroundColor: '#FF6C00',
  },
  userInfoWrp:{
    justifyContent: 'center'
  },
  userName:{
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 13,
    color: '#212121',
  },
  userEmail:{
    fontFamily: 'Roboto-Regular',
    fontSize: 11,
    lineHeight: 13,
    color: '#212121CC',
  },
  buttonCapture: {
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 50,
    backgroundColor: '#FF6C00',
  },
});
