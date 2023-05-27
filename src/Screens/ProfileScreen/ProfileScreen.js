import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authSignOutUser } from '../../../redux/auth/authOperations';
import {
  selectStateUserId,
  selectStateLogin,
  selectStateAvatar,
} from '../../../redux/selectors';
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

import { db } from '../../../firebase/config';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { ProfileList } from '../../components/ProfileList/ProfileList';
import { styles } from './ProfileScreen.styles';

export const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const userId = useSelector(selectStateUserId);
  const login = useSelector(selectStateLogin);
  // const avatarUri = useSelector(selectStateAvatar);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const dbRef = collection(db, 'posts');
    const myQuery = query(dbRef, where('userId', '==', userId));

    onSnapshot(myQuery, querySnapshot => {
      setPosts(querySnapshot.docs.map(doc => doc.data()));
    });
  }, []);

  return (
    <View style={styles.container}>
      <Button title="signOut" onPress={() => dispatch(authSignOutUser())} />
      <ProfileList posts={posts} login={login} navigation={navigation} />
    </View>
  );
};
