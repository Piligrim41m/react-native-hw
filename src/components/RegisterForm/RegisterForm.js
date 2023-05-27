import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authSignUpUser } from '../../../redux/auth/authOperations';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { styles } from './RegisterForm.styles';

const INITIAL_STATE = {
  login: null,
  email: null,
  password: null,
  avatarUri: null,
};

export const RegisterForm = ({ isShowKeyboard, setIsShowKeyboard, hideKeyboard, navigation }) => {
  const [state, setState] = useState({ ...INITIAL_STATE });
  const dispatch = useDispatch();

  // border
  const [isActiveInput, setIsActiveInput] = useState({
    login: false,
    email: false,
    password: false,
  });

  const handleInputFocus = textInput => {
    setIsActiveInput({
      [textInput]: true,
    });
  };
  const handleInputBlur = textInput => {
    setIsActiveInput({
      [textInput]: false,
    });
  };

  // password
  const [isShowPassword, setIsShowPassword] = useState(true);

  const toggleShowPassword = () => {
    setIsShowPassword(prevState => !prevState);
  };

  // avatar
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       await MediaLibrary.requestPermissionsAsync();
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   })();
  // }, []);

  const pickImage = async () => {
    try {
      await MediaLibrary.requestPermissionsAsync();

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setState(prev => ({ ...prev, avatarUri: result.assets[0].uri }));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const submit = async () => {
    hideKeyboard();
    dispatch(authSignUpUser(state));
    setState(INITIAL_STATE);
  };

  return (
    <TouchableWithoutFeedback onPress={() => hideKeyboard()}>
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View
          style={{
            ...styles.form,
            paddingBottom: isShowKeyboard ? hp('2%') : hp('9%'),
          }}
        >
          <View style={styles.avatarContainer}>
            <View style={styles.avatarWrp}>
              <Image source={{ uri: state.avatarUri }} style={styles.avatarImg} />
            </View>

            <TouchableOpacity style={styles.buttonAvatar} onPress={pickImage}>
              <Text style={styles.buttonAvatarText}>{'+'}</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>Registration</Text>

          <TextInput
            inputMode="text"
            placeholder="Name"
            value={state.login}
            style={{
              ...styles.input,
              borderColor: isActiveInput.login ? '#FF6C00' : '#E8E8E8',
            }}
            onFocus={() => {
              setIsShowKeyboard(true);
              handleInputFocus('login');
            }}
            onBlur={() => handleInputBlur('login')}
            onSubmitEditing={submit}
            onChangeText={value => setState(prev => ({ ...prev, login: value }))}
          />

          <TextInput
            inputMode="email"
            placeholder="Email"
            value={state.email}
            style={{
              ...styles.input,
              borderColor: isActiveInput.email ? '#FF6C00' : '#E8E8E8',
            }}
            onFocus={() => {
              setIsShowKeyboard(true);
              handleInputFocus('email');
            }}
            onBlur={() => handleInputBlur('email')}
            onSubmitEditing={submit}
            onChangeText={value => setState(prev => ({ ...prev, email: value }))}
          />

          <View>
            <TouchableOpacity style={styles.buttonPassword} onPress={() => toggleShowPassword()}>
              <Text style={styles.buttonPasswordText}>{isShowPassword ? 'Show' : 'Hide'}</Text>
            </TouchableOpacity>

            <TextInput
              inputMode="text"
              placeholder="Password"
              secureTextEntry={isShowPassword}
              value={state.password}
              style={{
                ...styles.input,
                borderColor: isActiveInput.password ? '#FF6C00' : '#E8E8E8',
                paddingRight: 100,
              }}
              onFocus={() => {
                setIsShowKeyboard(true);
                handleInputFocus('password');
              }}
              onBlur={() => handleInputBlur('password')}
              onSubmitEditing={submit}
              onChangeText={value => setState(prev => ({ ...prev, password: value }))}
            />
          </View>

          <View style={{ display: isShowKeyboard ? 'none' : 'flex' }}>
            <TouchableOpacity style={styles.buttonForm} onPress={submit}>
              <Text style={styles.buttonFormText}>Sign up</Text>
            </TouchableOpacity>

            <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
              Already have an account? Login
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
