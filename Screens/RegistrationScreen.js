import { useCallback, useState } from "react"
import {
    Button,
    ImageBackground,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
 
SplashScreen.preventAutoHideAsync()


// const loadFonts = async () => {
//   await Font.loadAsync({
//     "Roboto-Regular": require("../assets/fonts/Roboto/Roboto-Regular.ttf"),
//     "Roboto-Bold": require("../assets/fonts/Roboto/Roboto-Bold.ttf"),
//   });
// };

export const RegistrationScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isShowKeyboard, setIsShowKeyboard] = useState(false)
    const [fontsLoaded] = Font.useFonts({
        "Roboto-Medium": require("../assets/fonts/Roboto/Roboto-Medium.ttf"),
        "Roboto-Regular": require("../assets/fonts/Roboto/Roboto-Regular.ttf"),
    });
    // const [isReady, setIsReady] = useState(false);

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
    const onSignUp = () => {
        const regData = {
            name: name,
            email: email,
            password: password,
        };
        console.log(regData);
        keyboardHide();
        setName('');
        setEmail('');
        setPassword('');
    };

    const imageBgnd = require('../assets/images/PhotoBG.jpg')

    // if (!isReady) {
    //     return <AppLoading startAsync={loadFonts} onFinish={() => setIsReady(true)}/>
    // }

    if (!fontsLoaded) {
        return null;
    }

    return (
        <TouchableWithoutFeedback onPress={keyboardHide}>
        <View style={styles.externalBox}>
            <ImageBackground source={imageBgnd} resizeMode="cover" style={styles.image}>
                    {/* <View style={styles.form}> */}
                    <View style={{...styles.form, paddingBottom: isShowKeyboard ? 5 :80}} onLayout={onLoyoutRootView}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS == "ios" ? "padding" : "height"}
                        >
                        
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
                        {/* <Button title={"Sign up"} style={styles.input} onPress={onSignUp} /> */}
                            <TouchableOpacity style={styles.btn} activeOpacity={0.8} onPress={onSignUp}>
                                <Text>Sign up</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnSec} activeOpacity={0.8}>
                                <Text style={styles.descrBtnSec}>Already have an account?  Login</Text>
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
    },
    titleForm: {
        fontFamily: "Roboto-Medium",
        // fontStyle: normal,
        // fontWeight: 500,
        fontSize: 30,
       marginBottom: 16,
        lineHeight: 35,
        textAlign: "center",
        // letterSpacing: "0.01em",
        color: "#212121",
    },
    input: {
        // width: 200,
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
})