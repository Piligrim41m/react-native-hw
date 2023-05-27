import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectStateLogin } from '../../../redux/selectors';

import { db } from '../../../firebase/config';
import { setDoc, doc, Timestamp } from 'firebase/firestore';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { styles } from './CommentForm.styles';

export const CommentForm = ({ postId, isShowKeyboard, setIsShowKeyboard }) => {
  const login = useSelector(selectStateLogin);
  const [myComment, setMyComment] = useState('');
  const [isActiveInput, setIsActiveInput] = useState(false);

  const handleInputFocus = () => {
    setIsActiveInput(true);
  };

  const handleInputBlur = () => {
    setIsActiveInput(false);
  };

  const sendComment = async () => {
    const uniqueCommentId = Date.now().toString();
    try {
      const postRef = doc(db, 'posts', postId, 'comments', uniqueCommentId);

      await setDoc(postRef, {
        comment: myComment,
        login,
        createdAt: Timestamp.fromDate(new Date()),
        updatedAt: Timestamp.fromDate(new Date()),
      });

      setMyComment('');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.formWrp}>
      <TextInput
        style={{
          ...styles.input,
          borderBottomColor: isActiveInput ? '#FF6C00' : '#E8E8E8',
        }}
        value={myComment}
        onChangeText={value => setMyComment(value)}
        onFocus={() => {
          setIsShowKeyboard(true);
          handleInputFocus('comment');
        }}
        onBlur={() => handleInputBlur('comment')}
        inputMode="text"
        placeholder="Коментар..."
		multiline={true}
		maxLength={200}
		numberOfLines={5}
      />

      <TouchableOpacity
        style={
          !myComment
            ? styles.buttonForm
            : { ...styles.buttonForm, ...styles.activeButtonForm }
        }
        onPress={sendComment}
        disabled={!myComment}
      >
        <FontAwesome
          name="send"
          size={24}
          color={
            !myComment ? styles.buttonForm.fill : styles.activeButtonForm.fill
          }
        />
      </TouchableOpacity>
    </View>
  );
};
