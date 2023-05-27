import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    marginVertical: hp('3.8%'),
  },
  mapStyle:{
    borderRadius: 8,
    width: '100%',
    height: '100%',
  }
});
