import { useSelector } from 'react-redux';
import { selectStateLogin } from '../../../redux/selectors';
import { View, Text } from 'react-native';
import { dateConverter } from '../../helpers/dateConverter';
import { styles } from './Comment.styles';

export const Comment = ({ item: { login, comment, createdAt } }) => {
  const myLogin = useSelector(selectStateLogin);

  const trimLogin = login.slice(0, 2);
  return (
    <View
      style={
        myLogin === login
          ? { ...styles.container }
          : { ...styles.container, flexDirection: 'row' }
      }
    >
      <View style={styles.avatar}>
        <Text style={styles.login}>{trimLogin}</Text>
      </View>
      <View style={styles.commentWrp}>
        <Text style={styles.comment}>{comment}</Text>
        <Text style={styles.date}>{dateConverter(createdAt)}</Text>
      </View>
    </View>
  );
};
