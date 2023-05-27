import { useState } from 'react';
import {
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { LoginForm } from '../../components/LoginForm';
import { styles } from './LoginScreen.styles';
import image from '../../images/photoBg.jpeg';

export const LoginScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const hideKeyboard = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback
      onPress={hideKeyboard}
      style={styles.container}
      // onLayout={onLayoutRootView}
    >
      <ImageBackground source={image} style={styles.imageBg}>
        <LoginForm
          isShowKeyboard={isShowKeyboard}
          setIsShowKeyboard={setIsShowKeyboard}
          hideKeyboard={hideKeyboard}
          navigation={navigation}
        />
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};
