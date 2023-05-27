import { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { db } from '../../../firebase/config';
import { collection, onSnapshot, getCountFromServer } from 'firebase/firestore';
import { Feather } from '@expo/vector-icons';
import { styles } from './Post.styles';

export const Post = ({ post, navigation }) => {
  const [countComments, setCountComments] = useState(0);
  // console.log('post', post);

  useEffect(() => {
    const checkCount = async () => {
      const dbRef = collection(db, 'posts', post.id, 'comments');

      // onSnapshot(dbRef, data => {
      //   setCountComments(data?.docs?.length)
      // });

      const snapshot = await getCountFromServer(dbRef);
      setCountComments(snapshot.data().count)
    };

    checkCount();
  }, [post]);
  console.log('countComments', countComments);
  return (
    <View style={styles.postWrp}>
      <Image source={{ uri: post.photo }} style={styles.photo} />
      <Text style={styles.titlePost} ellipsizeMode="tail" numberOfLines={1}>
        {post.titlePost}
      </Text>

      <View style={styles.buttonsWrp}>
        <TouchableOpacity
          style={styles.buttonComments}
          onPress={() => navigation.navigate('Comments', post)}
        >
          <View style={styles.commentsIcon}>
            <Feather
              name="message-circle"
              size={24}
              color={styles.commentsIcon.fill}
            />
          </View>
          <Text style={styles.commentsCount}>{countComments}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonLocation}
          onPress={() => navigation.navigate('Map', post)}
        >
          <View style={styles.mapIcon}>
            <Feather name="map-pin" size={24} color={styles.mapIcon.fill} />
          </View>
          <Text style={styles.mapTitle} ellipsizeMode="tail" numberOfLines={1}>
            {post.location.title
              ? post.location.title
              : `${post.location.postAddress.city}, ${post.location.postAddress.street}`}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
//
