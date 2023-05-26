import React, {useEffect, useState} from "react";
import {
    View, Text, Image, Pressable, TextInput, FlatList,
} from "react-native";
import {useSelector} from "react-redux";
import {collection, doc, query, setDoc, getDocs, updateDoc, deleteDoc} from "firebase/firestore";
import {db} from '../../firebase/config'
import {MaterialIcons} from '@expo/vector-icons';
import {styles} from "../Posts/Posts.styles";


const CommentsScreen = ({route}) => {

    const [comment, setComment] = useState(null);
    const [commentId, setCommentId] = useState(null)
    const [comments, setComments] = useState([]);
    const {login} = useSelector(state => state.auth);
    const {userId} = useSelector(state => state.auth);

    const {
        id,
        header,
        photo,
        place,
    } = route.params;


    const commentHandler = (value) =>
        setComment(value);

    const commentsRef = query(collection(db, "posts", id, 'comments'));
    const postRef = doc(db, "posts", id);

    useEffect(() => {


        const getAllComments = async () => {

            let allComments = []
            const comments = await getDocs(commentsRef);

            await comments.forEach((comm) => {
                allComments.push({...comm.data(), id: comm.id})
            })

            const commentsCount = comments.size;

            await updateDoc(postRef, {commentsCount: commentsCount})

            const allOrderedComments = allComments.sort(
                (firstComment, secondComment) =>
                    secondComment.id - firstComment.id);
            setComments(allOrderedComments)

        }
        getAllComments();

    }, [commentId])


    const createComment = async () => {
        const uniqueCommentId = Date.now().toString()

        await setDoc(doc(db, 'posts', id, 'comments', uniqueCommentId), {
            comment,
            login,
            userId,
        });
        setCommentId(uniqueCommentId);
        setComment(null)
    }

    const deleteComment = async (uniqueCommentId) => {
        await deleteDoc(doc(db, "posts", id, 'comments', uniqueCommentId));
        setCommentId(uniqueCommentId + 'deleted');
    }


    return (
        <View style={styles.postsMain}>
            <View style={styles.postSection}>
                <Text style={{paddingBottom: 5}}>{header}</Text>
                <Image style={{
                    width: 150,
                    height: 200,
                    borderRadius: 8
                }}
                       source={{uri: photo}}/>

                <Text style={{paddingBottom: 20}}>Place: {place}</Text>

                <FlatList data={comments}
                          keyExtractor={comment => comment.id}
                          renderItem={({item}) => (
                              <View style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  width: 300,
                                  minHeight: 30,
                                  borderColor: 'lightgrey',
                                  backgroundColor: '#F6F6F6',
                                  borderWidth: 1,
                                  borderRadius: 8,
                                  marginTop: 5,
                                  padding: 5,
                              }}>
                                  <View style={{maxWidth: 270}}>
                                      {item.userId !== userId ? (
                                          <Text style={{fontStyle: 'italic'}}>author: {item.login}</Text>
                                      ) : (
                                          <Text style={{fontStyle: 'italic'}}>author: You</Text>
                                      )}
                                      <Text>{item.comment}</Text>
                                  </View>
                                  <View style={{minWidth: 30}}>

                                      {item.userId === userId
                                          && <Pressable title={"Delete"}
                                                        onPress={() => deleteComment(item.id)}
                                          >
                                              <MaterialIcons name="delete-outline" size={24} color="#FFCCCB"/>
                                          </Pressable>}
                                  </View>

                              </View>
                          )}/>


                <View style={styles.postText}>



                </View>

                <TextInput
                    value={comment}
                    onChangeText={commentHandler}
                    placeholder="comment"
                    style={styles.postInput}
                />

                {!comment ? (
                    <View style={styles.postButtonInactive}>
                        <Text>Publish</Text>
                    </View>
                ) : (
                    <Pressable title={"Post"} style={styles.postButtonActive}
                               onPress={createComment}
                    >
                        <Text style={{ color: "#fff"}}>Publish</Text>
                    </Pressable>
                )}

            </View>
        </View>
    )
};

export default CommentsScreen;