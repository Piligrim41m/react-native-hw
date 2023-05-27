import { View, FlatList, Image } from 'react-native';
import { Comment } from '../Comment';
import { styles } from './CommentsList.styles';

export const CommentsList = ({ allComments, photo }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: photo }} style={styles.photo} />

      <FlatList
        data={allComments}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <Comment item={item} />}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </View>
  );
};
