import React, { useCallback, useEffect, useState } from "react"
import {
    Image,
    ImageBackground,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useDispatch } from 'react-redux';
import { authSignUpUser } from "../redux/auth/authOperations";
import {Camera} from "expo-camera";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { MaterialIcons } from "@expo/vector-icons";

 
SplashScreen.preventAutoHideAsync()

export const RegistrationScreen = ({navigation}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isShowKeyboard, setIsShowKeyboard] = useState(false)
    // const [hasPermission, setHasPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.front);
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [makePhoto, setMakePhoto] = useState(null);
    const dispatch = useDispatch();
    const storage = getStorage();
    const [fontsLoaded] = Font.useFonts({
        "Roboto-Medium": require("../../assets/fonts/Roboto/Roboto-Medium.ttf"),
        "Roboto-Regular": require("../../assets/fonts/Roboto/Roboto-Regular.ttf"),
    });

    useEffect(() => {
        (async () => {
            // const {status} = await Camera.requestCameraPermissionsAsync();
            await Camera.requestCameraPermissionsAsync();
            await MediaLibrary.requestPermissionsAsync();
            // setHasPermission(status === "granted");
        })();
    }, []);
    
    const onLoyoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    const handlerName = (text) => setName(text);
    const handlerEmail = (text) => setEmail(text);
    const handlerPassword = (text) => setPassword(text);
    const keyboardHide = () => {
        Keyboard.dismiss();
        setIsShowKeyboard(false);
    }
    const toggleMakePhoto = () => {
        if (!makePhoto) {
            setMakePhoto('camera')
        }
        if (makePhoto === 'camera' || makePhoto === 'user') {
            setMakePhoto(null)
        }
    }

    const uploadAvatar = async () => {
        if (avatarUrl) {
            const response = await fetch(`${avatarUrl}`);
            const file = await response.blob();
            const unicuePostId = Date.now().toString();
            const imageRef = await ref(storage, `avatars/${unicuePostId}`);
            await uploadBytes(imageRef, file);
            return await getDownloadURL(imageRef);
        }
        return;
    }
    const onSignUp = async () => {
        const avatar = await uploadAvatar();
        const regData = {
            nickname: name,
            email: email,
            password: password,
            avatar: avatar,
        };
        console.log(regData);
        dispatch(authSignUpUser(regData))
        keyboardHide();
        setName('');
        setEmail('');
        setPassword('');
        setMakePhoto(null)
    };

    const takePicture = async () => {
        if (camera) {
            const { uri } = await camera.takePictureAsync();
            setAvatarUrl(uri);
            setMakePhoto('user')
            await MediaLibrary.createAssetAsync(uri);
        }
    }


    const imageBgnd = require('../../assets/images/PhotoBG.jpg')

    if (!fontsLoaded) {
        return null;
    }

    

    return (
        <TouchableWithoutFeedback onPress={keyboardHide}>
        <View style={styles.externalBox}>
            <ImageBackground source={imageBgnd} resizeMode="cover" style={styles.image}>
                    <View style={{...styles.form, paddingBottom: isShowKeyboard ? 5 :80}} onLayout={onLoyoutRootView}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS == "ios" ? "padding" : "height"}
                        >
                        <View style={styles.avatarBox}>
                            <View style={styles.avatarPlace}>

                            {!makePhoto &&
                                <Image style={styles.avatarImage}
                                        source={require('../../assets/images/fakeAvatar.png')}/>
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
                                        {makePhoto &&
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
                                <Image style={styles.avatarImage} source={{uri: avatarUrl}}/>
                            }
                        </View>
                            <Pressable title={"Login"} style={styles.add} onPress={toggleMakePhoto}>
                                <View>
                                    <Image source={require('../../assets/images/add.png')}/>
                                </View>
                            </Pressable>    
                        </View>
                            
                        <Text style={styles.titleForm}>Registration</Text>
                        <TextInput
                            placeholder="Name"
                            value={name}
                            onChangeText={handlerName}
                                style={styles.input}
                                onFocus={() => {setIsShowKeyboard(true)}}
                        />
                        <TextInput
                            placeholder="Email"
                            value={email}
                            onChangeText={handlerEmail}
                            style={styles.input}
                            onFocus={() => {setIsShowKeyboard(true)}}
                        />
                        <TextInput
                            placeholder="Password"
                            value={password}
                            onChangeText={handlerPassword}
                            style={styles.input}
                            secureTextEntry={true}
                            onFocus={() => {setIsShowKeyboard(true)}}
                        />
                            <TouchableOpacity style={styles.btn} activeOpacity={0.8} onPress={onSignUp}>
                                <Text>Sign up</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnSec} activeOpacity={0.8}>
                                <Text style={styles.descrBtnSec} onPress={() => navigation.navigate('Login')}>Already have an account?  Login</Text>
                            </TouchableOpacity>
                    </KeyboardAvoidingView>
            </View>
                </ImageBackground>
            </View>
        </TouchableWithoutFeedback>
    )
};

const styles = StyleSheet.create({
    externalBox: {
        width: "100%",
        flex: 1,
        backgroundColor: "#fff"
    },
    image: {
        flex: 1,
        justifyContent: "flex-end",
    },
    form: {
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 25,
        borderTopRightRadius:25,
        paddingTop: 92,
        paddingBottom: 80,
        position: 'relative'
    },
    avatarBox: {
        // display: 'flex',
        position: 'relative',
        alignItems: 'center',
        // justifyContent: 'flex-start'
    },
    avatarPlace: {
        display: "flex",
        Height: 100,
        Width: 100,
        position: "absolute",
        top: '-100%',
        borderRadius: 16,
        backgroundColor: '#F6F6F6',
    },
    avatarImage: {
        width: 250,
        height: 300,
        borderRadius: 8
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
        right: '40%',
        borderRadius: 50,
    },
    add: {
        display: 'flex',
        position: "absolute",
        minHeight: 25,
        minWidth: 25,
        borderRadius: 100,
        color: 'blue',
        top: 15,
        right: '19%',
    },
    titleForm: {
        fontFamily: "Roboto-Medium",
        fontSize: 30,
       marginBottom: 16,
        lineHeight: 35,
        textAlign: "center",
        color: "#212121",
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
    btn: {
        height: 51,
        backgroundColor: "#FF6C00",
        borderRadius: 100,
        marginHorizontal: 16,
        marginTop: 43,
        justifyContent: "center",
        alignItems: "center"
    },
    btnSec: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 16,
    },
    descrBtnSec: {
        fontSize: 16,
        color: "#1B4371",
        lineHeight: 19,
    },

// ===================================

    // container: {
    //     display: 'flex',
    //     minHeight: "100%",
    //     minWidth: "100%",
    //     alignItems: "flex-end",
    //     justifyContent: "flex-end",
    //     backgroundColor: "white",
    // },

    // img: {
    //     minWidth: "100%",
    //     flex: 1,
    //     justifyContent: 'flex-end',
    // },

    // regField: {
    //     marginTop: 'auto',
    //     display: 'flex',
    //     height: "80%",
    //     minWidth: "100%",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     backgroundColor: "white",
    //     borderTopLeftRadius: 30,
    //     borderTopRightRadius: 30,
    // },

    // regInputs: {
    //     display: 'flex',
    //     position: "relative",
    //     height: "80%",
    //     minWidth: "100%",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     backgroundColor: "white",
    // },

    // textPosition: {
    //     display: 'flex',
    //     paddingBottom: 40,
    // },

    // input: {
    //     width: 300,
    //     height: 50,
    //     padding: 10,
    //     borderWidth: 1,
    //     borderColor: "#E8E8E8",
    //     backgroundColor: "#E8E8E8",
    //     color: "#212121",
    //     borderRadius: 5,
    //     marginBottom: 10,

    // },

    // button: {
    //     color: "#fff",
    //     display: 'flex',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     minWidth: 300,
    //     height: 50,
    //     padding: 10,
    //     borderColor: "grey",
    //     borderRadius: 100,
    //     marginTop: 20,
    //     marginBottom: 20,
    //     backgroundColor: '#FF6C00',
    // },

    // createPostCamera: {
    //     flex: 1,
    //     minWidth: '100%',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },

   
});

