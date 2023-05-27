import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  permission: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 2,
    marginTop: hp('3.8%'),
  },
  cameraWrp: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#E8E8E8',
    overflow: 'hidden',
  },
  camera: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('28.8%'),
  },
  takePhotoContainer: {
    position: 'absolute',
    top: 0,
    backgroundColor: '#E8E8E8',
  },
  photo: {
    height: hp('28.8%'),
    width: wp('100%'),
  },
  buttonCapture: {
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  buttonToggle: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    alignSelf: 'flex-end',
  },
  buttonGalleryText: {
    marginTop: hp('0.96%'),
    fontSize: 16,
    lineHeight: 19,
    color: '#BDBDBD',
  },
  input: {
    height: 50,
    paddingVertical: hp('1.92%'),
    // paddingLeft: 0,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 19,
    color: '#212121',
    borderBottomWidth: 1,
  },
  locationWrp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputLocation: {
    flexDirection: 'column',
    flex: 24,
  },
  buttonLocation: {
    flex: 2,
  },
  locationIcon: {
    fill: '#BDBDBD',
  },
  buttonsWrp: {
    flex: 1,
    justifyContent: 'space-between',
  },
  buttonForm: {
    height: hp('6.12%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: '#F6F6F6',
  },
  activeButtonForm: {
    backgroundColor: '#FF6C00',
  },
  changedButtonForm: {
    width: wp('50%'),
  },
  buttonFormText: {
    alignItems: 'center',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#BDBDBD',
  },
  activeButtonFormText: {
    color: '#fff',
  },
  removeBtn: {
    marginBottom: hp('1%'),
    height: hp('6%'),
    width: wp('16.8%'),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 30,
    backgroundColor: '#F6F6F6',
    fill: '#DADADA',
  },
  activeRemoveBtn: {
    backgroundColor: '#FF6C00',
    fill: '#FFFFFF',
  },
  changedRemoveBtn: {
    alignSelf: 'flex-start',
  },
});
