import React, {useState} from "react";
import {
    View, TextInput,
    Text, Pressable, Keyboard,
    Platform, ImageBackground,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
} from "react-native";

import {authSignInUser} from "../../redux/auth/authOperations";
import {useDispatch} from "react-redux";

import {styles} from "./Auth.styles";


const initialState = {
    login: '',
    email: '',
    password: '',
}

const LoginScreen = ({navigation}) => {

    const [state, setState] = useState(initialState);
    const dispatch = useDispatch();


    const nameHandler = (value) =>
        setState((prevState) => ({
            ...prevState, email: value
        }));
    const passwordHandler = (value) =>
        setState((prevState) => ({
            ...prevState, password: value
        }));

    const onLogin = () => {
        Keyboard.dismiss()
        dispatch(authSignInUser(state));
        setState(initialState);
    };

    const goToSignIn = () => {
        navigation.navigate("Registration")
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <ImageBackground resizeMode="cover" source={require('../../../img/background.png')} style={styles.img}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS == "ios" ? "padding" : "height"}
                    >
                        <View style={styles.regField}>
                            <View style={styles.regInputs}>
                                <View style={styles.textPosition}>
                                    <Text style={{fontFamily: 'Roboto', fontSize: 30}}>Please Sign In</Text>
                                </View>
                                <TextInput
                                    value={state.email}
                                    onChangeText={nameHandler}
                                    placeholder="Email"
                                    style={styles.input}
                                />
                                <TextInput
                                    value={state.password}
                                    onChangeText={passwordHandler}
                                    placeholder="Password"
                                    secureTextEntry={true}
                                    style={styles.input}
                                />
                                <Pressable title={"Login"} style={styles.button} onPress={onLogin}>
                                    <Text style={{ color: "#fff", fontSize: 16 }}>Sign In</Text>
                                </Pressable>
                                <Pressable onPress={goToSignIn}><Text style={{color: '#1B4371'}}>Don`t have an account? Sign
                                    up</Text></Pressable>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </ImageBackground>
            </View>
        </TouchableWithoutFeedback>
    )
};

export default LoginScreen;