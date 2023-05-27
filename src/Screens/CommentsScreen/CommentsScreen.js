import { useState, useEffect } from 'react';

import { db } from '../../../firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';

import {
  View,
  Image,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CommentsList } from '../../components/CommentsList/CommentsList';
import { CommentForm } from '../../components/CommentForm/CommentForm';
import { styles } from './CommentsScreen.styles';

export const CommentsScreen = ({ navigation, route }) => {
  const { id: postId, photo } = route.params;
  const [allComments, setAllComments] = useState([]);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  useEffect(() => {
    const commentsRef = collection(db, 'posts', postId, 'comments');

    onSnapshot(commentsRef, data => {
      setAllComments(
        data.docs.map(comment => ({ id: comment.id, ...comment.data() }))
      );
    });
  }, [postId]);

  const hideKeyboard = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  console.log('allComments ', allComments);

  return (
    <TouchableWithoutFeedback onPress={() => hideKeyboard()}>
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.container}>
          {/* main content */}
          {allComments.length === 0 ? (
              <Image source={{ uri: photo }} style={styles.photo} />
          ) : null}
        
          {allComments.length !== 0 ? (
            <View>
              <CommentsList allComments={allComments} photo={photo} />
            </View>
          ) : null}

          {/* bottom form */}
          <View style={styles.bottomSection}>
            <CommentForm
              postId={postId}
              isShowKeyboard={isShowKeyboard}
              setIsShowKeyboard={setIsShowKeyboard}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
