import { useState } from 'react';
import {
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { RegisterForm } from '../../components/RegisterForm';
import { styles } from './RegistrationScreen.styles';
import image from '../../images/photoBg.jpeg';

export const RegistrationScreen = ({ navigation }) => {
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
        <RegisterForm
          isShowKeyboard={isShowKeyboard}
          setIsShowKeyboard={setIsShowKeyboard}
          hideKeyboard={hideKeyboard}
          navigation={navigation}
        />
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};
