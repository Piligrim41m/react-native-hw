import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { useEffect, useState } from "react";
import * as MediaLibrary from 'expo-media-library';
import { Entypo } from '@expo/vector-icons'; 
import * as Location from 'expo-location';


const CreatePostsScreen = ({navigation}) => {
    const [type, setType] = useState(CameraType.back);
    const [terrain, setTerrain] = useState('')
    const [postTitle, setPostTitle] = useState('')
    const [camera, setCamera] = useState(null)
    const [photo, setPhoto] = useState('')
    const [hasPermission, setHasPermission] = useState(null);
    const [location, setLocation] = useState({})
    // const [permission, requestPermission] = Camera.useCameraPermissions();
    // console.log('----PREMISSION----', permission)
    // console.log('----PREMISSION----', permission.granted)
    console.log('----PHOTO----', photo)
    // console.log('---REQUESTPREMISSION---', requestPermission)

    console.log('---------->', hasPermission)
    const toggleCameraType = () => {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back))
    }

    const takePhoto = async () => {
        const { uri } = await camera.takePictureAsync()
        const takeLocation = await Location.getCurrentPositionAsync()
        // setLocation(async () => await Location.getCurrentPositionAsync())
        console.log('--location-latitude--', takeLocation.coords.latitude)
        console.log('--location-longitude--', takeLocation.coords.longitude)
        console.log('camera--------->', uri)
        setPhoto(uri);
        setLocation(prevState => takeLocation.coords)
        console.log('---LOCATION---', location)
    }

    const sendPhoto = () => {
        console.log('navigation', navigation)
        navigation.navigate('DefaultScreen', { photo, postTitle, location, terrain })
        // setPhoto('');
        setPostTitle('');
        setTerrain('');
        setHasPermission(null)
        setLocation(null)
    }

    const handlerPostTitle = (text) => setPostTitle(text);
    const handlerTerrain = (text) => setTerrain(text);
    
    useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
        // await Camera.getCameraPermissionsAsync();
        // await Camera.requestCameraPermissionsAsync();
        await MediaLibrary.requestPermissionsAsync();
        await Location.requestForegroundPermissionsAsync();

      setHasPermission(status === "granted");
        })();
  }, [hasPermission]);

//     useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         setErrorMsg('Permission to access location was denied');
//         return;
//       }
//     })();
//   }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
// if (!permission) {
//     // Camera permissions are still loading
//     return <View />;
//   }

//     if (!permission.granted) {
//       return (
//       <View style={styles.container}>
//         <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
//         <Button onPress={requestPermission} title="grant permission" />
//       </View>
//     );
//   }
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
                <TouchableOpacity style={styles.btnPublish} onPress={sendPhoto}>
                    <Text style={styles.btnPublishText}>PUBLISH</Text>
                </TouchableOpacity>
            </View>
        </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
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