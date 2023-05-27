import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  postWrp: {
    marginBottom: hp('1.92%'),
  },
  photo: {
    height: hp('28.8%'),
    marginBottom: hp('0.96%'),
    borderRadius: 8,
    borderColor: '#E8E8E8',
  },
  titlePost: {
    marginBottom: hp('0.96%'),
    maxWidth: wp('70%'),
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 19,
    color: '#212121',
  },
  buttonsWrp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonComments: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentsIcon: {
    marginRight: hp('0.6%'),
    transform: [{ rotate: '-90deg' }],
    fill: '#BDBDBD',
  },
  commentsCount: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#BDBDBD',
  },
  buttonLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mapIcon:{
    marginRight: hp('0.6%'),
    fill: '#BDBDBD',
  },
  mapTitle:{
    maxWidth: wp('60%'),
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 19,
    textDecorationLine: 'underline',
    color: '#212121',
  }
});
