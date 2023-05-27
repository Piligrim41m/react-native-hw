import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';
import { Entypo } from '@expo/vector-icons'; 
import { db } from "../../firabase/config";
import "firebase/storage";
import 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";


const CreatePostsScreen = ({navigation}) => {
    const [type, setType] = useState(CameraType.back);
    const [terrain, setTerrain] = useState('')
    const [postTitle, setPostTitle] = useState('')
    const [camera, setCamera] = useState(null)
    const [photo, setPhoto] = useState(null)
    const [hasPermission, setHasPermission] = useState(null);
    const [location, setLocation] = useState(null)
    
    const {nickName, userId} = useSelector(state => state.auth)
    
    const storage = getStorage();
    
    const toggleCameraType = () => {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back))
    }

    const handlerTerrain = (text) => setTerrain(text);
    const handlerPostTitle = (text) => setPostTitle(text);

    const takePhoto = async () => {
        const { uri } = await camera.takePictureAsync()
        console.log('camera--------->', uri)
        setPhoto(uri);
    }

    const uploadPhotoToServer = async () => {
        const response = await fetch(`${photo}`);
        const file = await response.blob();
        const unicuePostId = Date.now().toString();
        const imageRef = await ref(storage, `postImage/${unicuePostId}`);
        await uploadBytes(imageRef, file);
        return await getDownloadURL(imageRef);
    }

    const sendPost = async () => {
        const unicuePostId = Date.now().toString();
        const photo = await uploadPhotoToServer()
        await setDoc(doc(db, 'posts', `${unicuePostId}`), {
            photo: photo,
            location: location,
            headers: {postTitle, terrain},
            login: nickName,
            userId: userId,
            commentsCount: 0,
        })

        setPostTitle('');
        setTerrain('');
        setPhoto(null);
        setLocation(null);

        navigation.navigate('DefaultScreen', {unicuePostId})
        
    }


    useEffect(() => {
        (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
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
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
    return (
        <View style={styles.container}>
            <Camera style={styles.camera} ref={setCamera} type={type}>
                {photo && (<View style={styles.takePhotoContainer}>
                    <Image source={{uri: photo}} style={{height: 200, width: 200}} />
                </View>)}
                <TouchableOpacity style={styles.flipContainer} onPress={toggleCameraType}>
                    <Text style={styles.flip}>FLIP</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.snapContainer} onPress={takePhoto}>
                    <Entypo name="camera" size={24} color="black" />
                </TouchableOpacity>
            </Camera>
            <View>
                <TextInput
                    placeholder="Post title..."
                    value={postTitle}
                    onChangeText={handlerPostTitle}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Terrain..."
                    value={terrain}
                    onChangeText={handlerTerrain}
                    style={styles.input}
                />

            </View>
            <View>
                <TouchableOpacity style={styles.btnPublish} onPress={sendPost}>
                    <Text style={styles.btnPublishText}>PUBLISH</Text>
                </TouchableOpacity>
            </View>
        </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        height: 240,
        marginTop: 20,
        marginHorizontal: 15,
        borderWidth:1,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: 'center'
    },
    flipContainer: {
        borderWidth:1,
        borderColor: '#e91e63',
    },
    flip: {
        color:'#fff'
    },
    snapContainer: {
        borderWidth:1,
        borderColor: '#e91e63',
        borderRadius: 50,
        color: '#fff',
        marginBottom: 20,
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        opacity: 0.3
    },
    snap: {
        color:'#fff'
    },
    takePhotoContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        borderWidth: 1,
        borderColor: '#e91e63',
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
    btnPublish: {
        marginHorizontal: 16,
        marginTop: 32,
        paddingVertical: 16,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#FF6C00',
        borderRadius: 100,
    },
    btnPublishText: {
        color: '#fff',
        size: 16,
    }
})

export default CreatePostsScreen;