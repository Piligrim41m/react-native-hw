import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authSignInUser } from '../../../redux/auth/authOperations';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { styles } from './LoginForm.styles';

const INITIAL_STATE = {
  email: '',
  password: '',
};

export const LoginForm = ({ isShowKeyboard, setIsShowKeyboard, hideKeyboard, navigation }) => {
  const [state, setState] = useState({ ...INITIAL_STATE });
  const dispatch = useDispatch();

  const submit = () => {
    console.log(state);
    dispatch(authSignInUser(state));
    setState(INITIAL_STATE);
    hideKeyboard();
    // navigation.navigate('Home', {})
  };

  // border
  const [isActiveInput, setIsActiveInput] = useState({
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

  return (
    <TouchableWithoutFeedback onPress={() => hideKeyboard()}>
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={{ ...styles.form, paddingBottom: isShowKeyboard ? hp('2%') : hp('15%') }}>
          <Text style={styles.title}>Login</Text>

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
              <Text style={styles.buttonFormText}>{'Sign in'}</Text>
            </TouchableOpacity>

            <Text style={styles.link} onPress={() => navigation.navigate('Registration')}>
              Don't have an account? Register
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
