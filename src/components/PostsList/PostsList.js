import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectStateLogin, selectStateEmail, selectStateAvatar } from '../../../redux/selectors';
import { db } from '../../../firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';
// import { collection, getDocs, query } from 'firebase/firestore';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Post } from '../Post';
import { styles } from './PostsList.styles';

const User = ({ login, email, avatar }) => {
  return (
    <View style={styles.userWrp}>
      <Image style={styles.userPhoto} source={{ uri: avatar }} />
      <View style={styles.userInfoWrp}>
        <Text style={styles.userName}>{login}</Text>
        <Text style={styles.userEmail}>{email}</Text>
      </View>
    </View>
  );
};

export const PostsList = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const login = useSelector(selectStateLogin);
  const email = useSelector(selectStateEmail);
  const avatar = useSelector(selectStateAvatar);

  // const getAllPosts = async () => {
  //   try {
  //     const querySnapshot = await getDocs(query(collection(db, 'posts')));
  //     console.log('--------', querySnapshot);
  //     const allPosts = querySnapshot.docs.map(post => ({
  //       ...post.data(),
  //       id: post.id,
  //     }));
  //     const sortPosts = allPosts.sort(
  //       (firstContact, secondContact) => secondContact.id - firstContact.id
  //     );
  //     setPosts(sortPosts);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   getAllPosts();
  // }, []);

  useEffect(() => {
    async function allPosts() {
      try {
        const dbRef = await collection(db, 'posts');
        console.log('-----DBRef------', dbRef);
        await onSnapshot(dbRef, data => {
          console.log('----DATA---', data);
          setPosts(data.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
      } catch (err) {
        console.log(err.message);
      }
    }
    allPosts();
  }, []);

  console.log('POSTS', posts);

  // if (posts.length === 0) {
  //   return (
  //     <View style={styles.container}>
  //       <User login={login} email={email} avatar={avatar} />
  //       <Text>Now you don't have a photo, but you can do something interesting...</Text>

  //       <TouchableOpacity
  //         style={styles.buttonCapture}
  //         onPress={() => navigation.navigate('Create')}
  //       >
  //         <MaterialIcons name="photo-camera" size={24} color="white" />
  //       </TouchableOpacity>
  //     </View>
  //   );
  // }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <>
            {index === 0 && <User login={login} email={email} avatar={avatar} />}
            <Post post={item} navigation={navigation} />
          </>
        )}
      />
    </View>
  );
};
