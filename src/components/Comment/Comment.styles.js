import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row-reverse',
    padding: 2,
    gap: 5,
  },
  commentWrp: {
    flex: 10,
    padding: 4,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    },
    
    borderRadius: 10,
    backgroundColor: '#F6F6F6',
  },
  avatar: {
    flex: 1,
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: 'grey',
  },
  login: {
    color: '#fff',
  },
  comment: {},
  date: {
    alignSelf: 'flex-end',
    color: '#BDBDBD'
  },
});
