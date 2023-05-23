import { collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useEffect } from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useSelector } from "react-redux";
import { db } from "../../firabase/config";
import { MaterialIcons } from '@expo/vector-icons';

const CommentsScreen = ({route}) => {
    const [comment, setComment] = useState(null);
    const [commentId, setCommentId] = useState(null);
    const [comments, setComments] = useState(null);
    const { nickName, userId } = useSelector(state => state.auth);

    const {
        id,
        title,
        photo,
        terrain,
    } = route.params;

    const handlerComment = (text) => setComment(text);

    // const commentsRef = query(collection(db, 'posts', id, 'comments'));
    // const postRef = doc(db, 'posts', id);

    useEffect(() => {
        const getAllComments = async () => {
            let allComments = [];
            const comments = await getDocs(commentsRef);
            comments.forEach(comm => {
                allComments.push({ ...comm.data(), id: comm.id })
            });
            const commentsCount = comments.size;
            await updateDoc(postRef, { commentsCount: commentsCount });
            const allOrderedComments = allComments.sort(
                (firstComment, secondComment) => secondComment.id - firstComment.id
            );
            setComments(allOrderedComments)
        }
        getAllComments()
    }, [commentId])

    const createComment = async () => {
        const uniqueCommentId = Date.now().toString();
        await setDoc(doc(db, 'posts', id, 'comments', uniqueCommentId, {
            comment,
            nickName,
            userId,
        }))
        setCommentId(uniqueCommentId);
        setComment(null);
    }

    const deleteComment = async (uniqueCommentId) => {
        await deleteDoc(doc(db, 'posts', id, 'comments', uniqueCommentId))
        setCommentId(uniqueCommentId + 'deleted');
    }



    return (
        <View style={styles.container}>
            <View style={styles.postSection}>
                <Text style={{paddingBottom: 5}}>{title}</Text>
                <Image style={{
                    width: 150,
                    height: 200,
                    borderRadius: 8
                }}
                    source={{uri: photo}}/>

                <Text style={{paddingBottom: 20}}>Place: {terrain}</Text>

                <FlatList
                    data={comments}
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
                                <Text style={{fontStyle: 'italic'}}>author: {item.nickName}</Text>
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
            </View>
            <View>
                <TextInput
                    placeholder="Comment"
                    value={comment}
                    onChangeText={handlerComment}
                    style={styles.input}
                />
            </View>
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
            {/* <TouchableOpacity style={styles.btnPublish} onPress={createComment}>
                <Text style={styles.btnPublishText}>PUBLISH</Text>
            </TouchableOpacity> */}
        </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    postSection: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        minHeight: 255,
        maxWidth: '100%',
    },
    input: {
        height: 50,
        padding: 16,
        borderWidth: 1,
        borderColor: "#E8E8E8",
        backgroundColor: "#F6F6F6",
        borderRadius: 8,
        marginTop: 16,
        marginHorizontal: 16,
        color: "#212121",
    },
    postButtonActive: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 300,
        height: 50,
        padding: 10,
        borderColor: "grey",
        borderRadius: 100,
        marginBottom: 10,
        backgroundColor: '#FF6C00',
        marginTop: 20,
    },

    postButtonInactive: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 300,
        height: 50,
        padding: 10,
        borderColor: "grey",
        borderRadius: 100,
        marginBottom: 10,
        backgroundColor: '#F6F6F6',
        marginTop: 20,
    },
})

export default CommentsScreen;