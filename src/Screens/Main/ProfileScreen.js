import React, {useEffect, useState} from "react";
import {
    View,
    Pressable,
    Image,
    ImageBackground, Text,
    FlatList,
} from "react-native";
import {authSignOutUser, profileUpdateAvatar} from "../../redux/auth/authOperations";
import {useDispatch, useSelector} from "react-redux";
import {collection, deleteDoc, doc, getDocs, query, where} from "firebase/firestore";
import {db} from "../../firebase/config";
import {Camera} from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import {styles} from "./Main.styles";
import {Ionicons, MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";


const ProfileScreen = ({navigation, route}) => {

    const {userId, avatar} = useSelector(state => state.auth);
    const [posts, setPosts] = useState([])
    const [deletedPost, setDeletedPost] = useState('');
    const [makePhoto, setMakePhoto] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.front);
    const dispatch = useDispatch();

    const storage = getStorage();

    const signOut = () => {
        dispatch(authSignOutUser())
    }

    const userPostsRef = query(collection(db, "posts"), where("userId", "==", userId));

    useEffect(() => {
        (async () => {
            const {status} = await Camera.requestCameraPermissionsAsync();
            await MediaLibrary.requestPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    useEffect(() => {

        getAllPosts();

    }, [deletedPost])

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
        const allPosts = querySnapshot.docs.map((post) => ({
            ...post.data(), id: post.id
        }));

        const sortedPosts = allPosts.sort(
            (firstContact, secondContact) =>
                secondContact.id - firstContact.id);
        setPosts(sortedPosts);
    }


    const deletePost = async (postId) => {
        await deleteDoc(doc(db, "posts", postId));
        setDeletedPost(postId);
    }


    const uploadAvatar = async () => {

        if (avatarUrl) {
            const response = await fetch(`${avatarUrl}`)
            const file = await response.blob();
            const uniquePostId = Date.now().toString()

            const imageRef = await ref(storage, `avatars/${uniquePostId}`)
            await uploadBytes(imageRef, file);
            const newAvatar = await getDownloadURL(imageRef);

            dispatch(profileUpdateAvatar({avatar: newAvatar}));

            setAvatarUrl(null);
            setMakePhoto(null);
        }
    }

    const takePicture = async () => {
        if (cameraRef) {
            const {uri} = await cameraRef.takePictureAsync();
            setAvatarUrl(uri);
            setMakePhoto('user')
            await MediaLibrary.createAssetAsync(uri);
        }
    }

    const goToMap = (location) => {
        navigation.navigate("Map", {
            location: location,
        })
    }

    const goToComments = (item) => (
        navigation.navigate("Comments", {
            id: item.id,
            header: item.headers.name,
            photo: item.photo,
            place: item.headers.place,
            location: item.location,
        })
    )


    return (
        <View style={{
            flex: 1,
            backgroundColor: 'white',
        }}>
            <ImageBackground resizeMode="cover" source={require('../../../img/background.png')} style={styles.img}>
                <View style={styles.regField}>
                    <View style={styles.regInputs}>

                        <View style={styles.avatarPlace}>
                            {!makePhoto &&
                                <Image style={styles.avatarImage}
                                       source={{uri: avatar}}/>
                            }
                            {makePhoto === 'camera' &&
                                <Camera
                                    style={styles.avatarImage}
                                    type={type}
                                    ref={(ref) => {
                                        setCameraRef(ref);
                                    }}
                                >

                                    <View style={styles.makePhotoButton}>
                                        {makePhoto === 'camera' &&
                                            <Pressable
                                                onPress={takePicture}
                                                title="TakePicture"
                                            >
                                                <MaterialIcons name="add-a-photo" size={24} color="grey"/>
                                            </Pressable>
                                        }
                                    </View>

                                </Camera>
                            }
                            {makePhoto === 'user' &&
                                <View>
                                    <Image style={styles.avatarImage} source={{uri: avatarUrl}}/>
                                    <Pressable
                                        style={styles.makePhotoButton}
                                        onPress={uploadAvatar}
                                        title="UploadPicture"
                                    >
                                        <MaterialCommunityIcons name="cloud-upload" size={24} color="grey"/>
                                    </Pressable>
                                </View>
                            }
                        </View>

                        <Pressable title={"Login"} style={styles.add} onPress={toggleMakePhoto}>
                            <View>
                                <Image source={require('../../../img/add.png')}/>
                            </View>
                        </Pressable>

                        <Pressable
                            onPress={signOut}
                            title="LogOut"
                            style={styles.profileLogOut}
                        >
                            <MaterialCommunityIcons name="logout" size={24} color="lightgrey"/>
                        </Pressable>

                        <FlatList data={posts} keyExtractor={post => post.id}
                                  renderItem={({item}) => (
                                      <View style={styles.postSection}>
                                          <Text style={{paddingBottom: 20}}>{item.headers.name}</Text>

                                          <Image style={styles.postImage}
                                                 source={{uri: item.photo}}
                                          />
                                          <View style={styles.postText}>


                                              <View style={{
                                                  display: 'flex',
                                                  flexDirection: 'row',
                                                  justifyContent: 'space-between',
                                              }}>
                                                  <View>
                                                      <Text style={{paddingBottom: 20, paddingRight: 10}}>
                                                          {item.headers.place}
                                                      </Text>
                                                  </View>
                                                  <Pressable title={"Delete"}
                                                             onPress={() => deletePost(item.id)}>
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
};

export default ProfileScreen;


