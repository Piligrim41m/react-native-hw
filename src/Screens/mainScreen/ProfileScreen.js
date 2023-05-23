import { FlatList, Image, ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Camera } from "expo-camera";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { authSignOutUser, profileUpdateAvatar } from "../../redux/auth/authOperations";
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firabase/config";
import * as MediaLibrary from 'expo-media-library';
import { MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";

const ProfileScreen = ({ navigation, route }) => {
    const [posts, setPosts] = useState([]);
    const [deletedPost, setDeletedPost] = useState('');
    const [makePhoto, setMakePhoto] = useState(null);
    const [camera, setCamera] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.front);
    const dispatch = useDispatch();
    
    const storage = getStorage();
    const { userId, avatar } = useSelector(state => state.auth);

    const signOut = () => {
        dispatch(authSignOutUser())
    };

    const userPostsRef = query(collection(db, 'posts'), where('userId', '==', userId));

    const toggleMakePhoto = () => {
        if (!makePhoto) {
            setMakePhoto('camera')
        }
        if (makePhoto === 'camera' || makePhoto === 'user') {
            setMakePhoto(null)
        }
    }

    const getAllPosts = async () => {
        const querySnapshot = await getDocs(userPostsRef);
        const allPosts = querySnapshot.docs.map(post => ({
            ...post.data(), id: post.id
        }));
        const sortPosts = allPosts.sort(
            (firstContact, secondContact) => secondContact.id - firstContact.id
        );
        setPosts(sortPosts);
    }

    const deletePost = async (postId) => {
        await deleteDoc(doc(db, 'posts', postId));
        setDeletedPost(postId)
    }

    const uploadAvatar = async () => {
        if (avatarUrl) {
            const response = await fetch(`${avatarUrl}`);
            const file = await response.blob();
            const unicuePostId = Date.now().toString();
            const imageRef = await ref(storage, `avatars/${unicuePostId}`);
            await uploadBytes(imageRef, file);
            const newAvatar = await getDownloadURL(imageRef);

            dispatch(profileUpdateAvatar({ avatar: newAvatar }));
            setAvatarUrl(null);
            setMakePhoto(null);
        }
    }

    const takePicture = async () => {
        if (camera) {
            const { uri } = await camera.takePictureAsync();
            setAvatarUrl(uri);
            setMakePhoto('user');
            await MediaLibrary.createAssetAsync(uri);
        }
    }


    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            await MediaLibrary.requestPermissionsAsync()
            setHasPermission(status === 'granted')
        })();
    }, []);

    useEffect(() => {
        getAllPosts();
    }, [deletedPost]);

    const imageBgnd = require('../../../assets/images/PhotoBG.jpg')

    return (
        <View style={styles.container}>
            <ImageBackground resizeMode="cover" source={imageBgnd} style={styles.img}>
                <View style={styles.regField}>
                    <View style={styles.regInputs}>
                        <View style={styles.avatarPlace}>
                            {!makePhoto && 
                                <Image
                                    style={styles.avatarImage}
                                    source={{uri:avatar}}/>
                            }
                            {makePhoto === 'camera' && 
                                <Camera
                                    style={styles.avatarImage}
                                    type={type}
                                    ref={(ref) => setCamera(ref)}
                                >
                                    <View style={styles.makePhotoButton}>
                                        {makePhoto === 'camera' && 
                                            <Pressable
                                                onPress={takePicture}
                                                title='TakePikture'
                                            >
                                                <MaterialIcons name="add-a-photo" size={24} color="grey"/>
                                            </Pressable>
                                        }
                                    </View>
                                </Camera>
                            }
                            {makePhoto === 'user' &&
                                <View>
                                    <Image tyle={styles.avatarImage} source={{ uri: avatarUrl }} />
                                    <Pressable
                                        style={styles.makePhotoButton}
                                        onPress={uploadAvatar}
                                        title='UploadPicture'>
                                        <MaterialCommunityIcons name="cloud-upload" size={24} color="grey"/>
                                    </Pressable>
                                </View>
                            }
                        </View>
                        <Pressable title={"Login"} style={styles.add} onPress={toggleMakePhoto}>
                            <View>
                                <Image source={require('../../../assets/images/add.png')}/>
                            </View>
                        </Pressable>
                        <FlatList
                            data={posts}
                            keyExtractor={ost => post.id}
                            renderItem={({ item }) => (
                                <View style={styles.postSection}>
                                    <Text style={{ paddingBottom: 20 }}>{item.headers.postTitle}</Text>
                                    <Image style={styles.postImage} source={{ uri: item.photo }} />
                                    <View style={styles.postText}>
                                        <View
                                            style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            }}>
                                            <Text style={{ paddingBottom: 20, paddingRight: 10 }}>{item.headers.terrain}</Text>
                                            <Pressable title={"Delete"} onPress={() => deletePost(item.id)}>
                                                <MaterialIcons name="delete-outline" size={24} color="#FFCCCB"/>
                                            </Pressable>
                                        </View>
                                    </View>
                                </View>
                            )}
                        />
                    </View>
                </View>
            </ImageBackground> 
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    img: {
        minWidth: "100%",
        flex: 1,
        justifyContent: 'flex-end',
    },

    regField: {
        marginTop: 'auto',
        display: 'flex',
        height: "80%",
        minWidth: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },

    regInputs: {
        display: 'flex',
        position: "relative",
        height: "80%",
        minWidth: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
    },

    avatarPlace: {
        display: "flex",
        minHeight: 120,
        minWidth: 120,
        position: "absolute",
        top: -180,
        borderRadius: 16,
        backgroundColor: '#F6F6F6',
    },

    avatarImage: {
        width: 150,
        height: 200,
        borderRadius: 8
    },

    add: {
        display: 'flex',
        position: "absolute",
        minHeight: 25,
        minWidth: 25,
        borderRadius: 100,
        color: 'blue',
        top: -25,
        right: '31%',
    },

    makePhotoButton: {
        alignContent: 'center',
        position: "absolute",
        backgroundColor: 'rgba(255,255,255,0.3)',
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        top: '40%',
        right: '30%',
        borderRadius: 50,
    },

    profileLogOut: {
        display: 'flex',
        position: "absolute",
        minHeight: 25,
        minWidth: 25,
        borderRadius: 100,
        // color: 'blue',
        top: -50,
        right: '10%',
    },

    postSection: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        minHeight: 255,
        maxWidth: '100%',
    },

    postImage: {
        width: 225,
        height: 300,
        borderRadius: 8
    },

    postText: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
        justifyContent: 'space-between',
    },
})

export default ProfileScreen;