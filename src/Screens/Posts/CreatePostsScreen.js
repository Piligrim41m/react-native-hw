import React, {useEffect, useState} from "react";
import {
    View, TextInput,
    Text, Pressable, Image,
} from "react-native";
import {useSelector} from "react-redux";
import {Camera} from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import {db} from '../../firebase/config'
import 'firebase/storage';
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {doc, setDoc} from "firebase/firestore";
import axios from "axios";
import {styles} from "./Posts.styles";
import {Ionicons, MaterialIcons} from "@expo/vector-icons";

const initialPictureHeaders = {
    name: '',
    place: '',
}

const CreatePostsScreen = ({navigation}) => {

    const [hasPermission, setHasPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [pictureUrl, setPictureUrl] = useState(null);
    const [pictureHeaders, setPictureHeaders] = useState(initialPictureHeaders);
    const [location, setLocation] = useState(null);

    const {login, userId} = useSelector((state) => state.auth);

    const storage = getStorage()

    const placeHandler = (value) => {
        setPictureHeaders((prevState) => ({
            ...prevState, place: value
        }));
    }

    useEffect(() => {
        (async () => {
            const {status} = await Camera.requestCameraPermissionsAsync();
            await MediaLibrary.requestPermissionsAsync();

            setHasPermission(status === "granted");
        })();

        (async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                console.log("Permission to access location was denied");
                alert("Permission to access location was denied")
            }
            let locationData = await Location.getCurrentPositionAsync({});
            const coords = {
                latitude: locationData.coords.latitude,
                longitude: locationData.coords.longitude,
            };

            await setLocation(coords);
        })();
    }, []);

    if (hasPermission === null) {
        return <View/>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const nameHandler = (value) =>
        setPictureHeaders((prevState) => ({
            ...prevState, name: value
        }));

    const uploadPhoto = async () => {

        const response = await fetch(`${pictureUrl}`)
        const file = await response.blob();
        const uniquePostId = Date.now().toString()

        const imageRef = await ref(storage, `photos/${uniquePostId}`)
        await uploadBytes(imageRef, file);

        return await getDownloadURL(imageRef);
    }

    const makePost = async () => {

        const uniquePostId = Date.now().toString()
        const photo = await uploadPhoto();
        await setDoc(doc(db, "posts", `${uniquePostId}`), {
            photo: photo,
            location: location,
            headers: pictureHeaders,
            login: login,
            userId: userId,
            commentsCount: 0,
        });

        setPictureHeaders(initialPictureHeaders);
        setPictureUrl(null);

        await navigation.navigate("PostsDefaultScreen", {
            uniquePostId,
        })
    }

    const takePicture = async () => {
        if (cameraRef) {
            try {
                const {uri} = await cameraRef.takePictureAsync();
                setPictureUrl(uri);
                await MediaLibrary.createAssetAsync(uri);
            }    catch (err) {
                console.log(err.message);
                alert(err.message)
            }
        }
    }

    const reverseCamera = async () => {
        setType(
            type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
        );
    }

    const goToMap = () => {
        navigation.navigate("Map", {
            location,
        })
    }

    return (
        <View style={styles.createPostMain}>
            <View style={styles.createPostPhoto}>
                {!pictureUrl ? (
                    <Camera
                        style={styles.createPostCamera}
                        type={type}
                        ref={(ref) => {
                            setCameraRef(ref);
                        }}
                    >
                        <View style={styles.makePhotoButton}>
                            {!pictureUrl &&
                                <Pressable
                                    onPress={takePicture}
                                    title="TakePicture"
                                >
                                    <MaterialIcons name="add-a-photo" size={24} color="grey"/>
                                </Pressable>
                            }
                        </View>
                    </Camera>
                ) : (
                    <View>
                        <Image style={styles.createPostCamera}
                               source={{uri: pictureUrl}}/>
                    </View>
                )
                }
            </View>
            {!pictureUrl ? (
                <Pressable style={styles.retakePhotoButton}
                           onPress={reverseCamera}
                           title="Reverse Camera"
                >
                    <MaterialIcons name="flip-camera-android" size={24} color="grey"/>
                </Pressable>
            ) : (
                <Pressable style={styles.retakePhotoButton}
                           onPress={() => setPictureUrl(null)}>
                    <MaterialIcons name="add-a-photo" size={24} color="grey"/>
                </Pressable>
            )
            }
            <TextInput
                onChangeText={nameHandler}
                placeholder="name"
                value={pictureHeaders.name}
                style={styles.postInput}
            />

            <View style={{flexDirection: 'row', alignItems: 'center'}}>

                {location ? (
                    <Pressable title={"Map"}
                               onPress={goToMap}>
                        <Ionicons name="location-outline" size={24} color="green"/>
                    </Pressable>
                ) : (
                    <Ionicons name="location-outline" size={24} color="grey"/>
                )}

                <TextInput
                    onChangeText={placeHandler}
                    placeholder='place'
                    value={pictureHeaders.place}
                    style={styles.postInput}
                />
            </View>

            {!pictureUrl ? (
                <View style={styles.postButtonInactive}>
                    <Text>Publish</Text>
                </View>
            ) : (
                <Pressable title={"Post"} style={styles.postButtonActive}
                           onPress={makePost}
                >
                    <Text style={{ color: "#fff"}}>Publish post</Text>
                </Pressable>
            )}
        </View>
    )
};

export default CreatePostsScreen;

// todo: camera 2nd shoot error: https://stackoverflow.com/questions/73469845/solved-expo-camera-takepictureasync-undefined-unhandled-promise-rejection-typ

