import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { Post } from '../Post';
import { styles } from './ProfileList.styles';

export const ProfileList = ({ navigation, posts, login }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <Post post={item} navigation={navigation} />}
      />
    </View>
  );
};
