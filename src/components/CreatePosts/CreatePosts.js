import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectStateUserId } from '../../../redux/selectors';
import { db, myStorage } from '../../../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import {
  View,
  Image,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Linking,
} from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { MaterialIcons, Feather, AntDesign } from '@expo/vector-icons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LoaderScreen } from '../../Screens/LoaderScreen';
import { ModalWrp } from '../ModalWrp';
import { styles } from './CreatePosts.styled';

const INITIAL_POST = {
  photoUri: '',
  titlePost: '',
  location: {},
};

export const CreatePosts = ({ navigation }) => {
  const cameraRef = useRef();
  const [type, setType] = useState(CameraType.back);
  const [permissionCam, requestPermissionCam] = Camera.useCameraPermissions();
  const [permissionLoc, setPermissionLoc] = useState();
  const [state, setState] = useState(INITIAL_POST);
  const userId = useSelector(selectStateUserId);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isActiveInput, setIsActiveInput] = useState({
    title: false,
    location: false,
  });
  const [styleSendBtn, setStyleSendBtn] = useState({});
  const [styleRemoveBtn, setStyleRemoveBtn] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await Camera.requestCameraPermissionsAsync();
        await MediaLibrary.requestPermissionsAsync();
        setPermissionLoc(await Location.getForegroundPermissionsAsync());
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);

  useEffect(() => {
    if (state.photoUri && !isShowKeyboard) {
      setStyleSendBtn({
        ...styles.buttonForm,
        ...styles.activeButtonForm,
      });

      setStyleRemoveBtn({
        ...styles.removeBtn,
        ...styles.activeRemoveBtn,
      });

      return;
    }

    if (state.photoUri && isShowKeyboard) {
      setStyleSendBtn({
        ...styles.buttonForm,
        ...styles.activeButtonForm,
        ...styles.changedButtonForm,
      });

      setStyleRemoveBtn({
        ...styles.removeBtn,
        ...styles.activeRemoveBtn,
        ...styles.changedRemoveBtn,
      });

      return;
    }

    if (!state.photoUri && !isShowKeyboard) {
      return setStyleSendBtn({
        ...styles.buttonForm,
      });
    }

    if (!state.photoUri && isShowKeyboard) {
      setStyleSendBtn({
        ...styles.buttonForm,
        ...styles.changedButtonForm,
      });

      setStyleRemoveBtn({
        ...styles.removeBtn,
        ...styles.changedRemoveBtn,
      });

      return;
    }
  }, [state, isShowKeyboard]);

  if (!permissionCam) {
    return <LoaderScreen />;
  }

  if (!permissionCam.granted) {
    return (
      <View style={styles.permission}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermissionCam} title="grant permission" />
      </View>
    );
  }

  const toggleCameraType = () => {
    console.log('flip camera');
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  };

  const takePhoto = async () => {
    if (cameraRef) {
      try {
        const { uri } = await cameraRef.current.takePictureAsync();
        const location = await getLocation();

        setState(prev => ({ ...prev, photoUri: uri, location }));
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const location = await getLocation();

        setState(prev => ({
          ...prev,
          photoUri: result.assets[0].uri,
          location,
        }));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getLocation = async () => {
    if (!permissionLoc.canAskAgain || permissionLoc.status === 'denied') {
      Linking.openSettings();
      return;
    }

    try {
      const location = await Location.getCurrentPositionAsync({});

      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      const [postAddress] = await Location.reverseGeocodeAsync(coords);

      return { ...coords, postAddress };
    } catch (error) {
      console.log(error.message);
    }
  };

  const getCustomLocation = async () => {
    setModalVisible(true);
  };

  const draggableMarker = async coords => {
    const [postAddress] = await Location.reverseGeocodeAsync(coords);
    setState(prev => ({ ...prev, location: { ...coords, postAddress } }));
  };

  const hideKeyboard = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

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

  const uploadPhotoToServer = async () => {
    const uniquePostId = Date.now().toString();

    try {
      const response = await fetch(state.photoUri);

      const file = await response.blob();

      const imageRef = await ref(myStorage, `postImages/${uniquePostId}`);

      await uploadBytes(imageRef, file);

      return await getDownloadURL(imageRef);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadPostToServer = async () => {
    const uniquePostId = Date.now().toString();

    try {
      const photo = await uploadPhotoToServer();
      const postRef = doc(db, 'posts', uniquePostId);

      await setDoc(postRef, {
        photo,
        userId,
        titlePost: state.titlePost,
        location: state.location,
        createdAt: Timestamp.fromDate(new Date()),
        updatedAt: Timestamp.fromDate(new Date()),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const publishPost = async () => {
    hideKeyboard();

    try {
      await uploadPostToServer();
    } catch (error) {
      console.log(error);
    }

    setState(INITIAL_POST);

    navigation.navigate('PostsScreen', { screen: 'Posts' });
  };

  return (
    <TouchableWithoutFeedback onPress={() => hideKeyboard()}>
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* main content */}
        <View style={styles.container}>
          <View style={styles.cameraWrp}>
            <Camera
              style={
                isShowKeyboard ? { ...styles.camera, height: hp('22%') } : { ...styles.camera }
              }
              type={type}
              ref={cameraRef}
            >
              <TouchableOpacity style={styles.buttonCapture} onPress={takePhoto}>
                <MaterialIcons name="photo-camera" size={24} color="white" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.buttonToggle} onPress={toggleCameraType}>
                <Feather name="repeat" size={24} color="white" />
              </TouchableOpacity>

              {state.photoUri !== '' && (
                <View style={styles.takePhotoContainer}>
                  <Image
                    source={{ uri: state.photoUri }}
                    style={
                      isShowKeyboard ? { ...styles.photo, height: hp('22%') } : { ...styles.photo }
                    }
                    resizeMode="contain"
                  />
                </View>
              )}
            </Camera>
          </View>

          {state.photoUri !== '' ? (
            <TouchableOpacity onPress={() => setState(prev => ({ ...prev, photoUri: '' }))}>
              <Text style={styles.buttonGalleryText}>Edit photo</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={pickImage}>
              <Text style={styles.buttonGalleryText}>Upload photo</Text>
            </TouchableOpacity>
          )}

          <View
            style={{
              paddingVertical: isShowKeyboard ? hp('0.96%') : hp('3.8%'),
              gap: isShowKeyboard ? hp('0.48%') : hp('1.92%'),
            }}
          >
            <TextInput
              style={{
                ...styles.input,
                borderBottomColor: isActiveInput.title ? '#FF6C00' : '#E8E8E8',
              }}
              value={state.titlePost}
              onChangeText={value => setState(prev => ({ ...prev, titlePost: value }))}
              onFocus={() => {
                setIsShowKeyboard(true);
                handleInputFocus('title');
              }}
              onBlur={() => handleInputBlur('title')}
              inputMode="text"
              placeholder="Post title"
            />

            <View style={styles.locationWrp}>
              <TouchableOpacity style={styles.buttonLocation} onPress={getCustomLocation}>
                <Feather name="map-pin" size={24} color={styles.locationIcon.fill} />
              </TouchableOpacity>

              <TextInput
                style={{
                  ...styles.input,
                  ...styles.inputLocation,
                  borderBottomColor: isActiveInput.location ? '#FF6C00' : '#E8E8E8',
                }}
                value={state.location?.title}
                onChangeText={value =>
                  setState(prev => ({
                    ...prev,
                    location: { ...prev.location, title: value },
                  }))
                }
                onFocus={() => {
                  setIsShowKeyboard(true);
                  handleInputFocus('location');
                }}
                onBlur={() => handleInputBlur('location')}
                inputMode="text"
                placeholder="Terrain..."
              />

              {modalVisible && (
                <ModalWrp
                  title="Location"
                  location={state.location}
                  modalVisible={modalVisible}
                  setModalVisible={setModalVisible}
                  draggableMarker={draggableMarker}
                />
              )}
            </View>
          </View>
        </View>

        {/* buttons */}
        <View
          style={
            !isShowKeyboard
              ? { ...styles.buttonsWrp }
              : {
                  ...styles.buttonsWrp,
                  flexDirection: 'row-reverse',
                  marginTop: hp('5%'),
                }
          }
        >
          <TouchableOpacity style={styleSendBtn} onPress={publishPost} disabled={!state.photoUri}>
            <Text
              style={
                !state.photoUri
                  ? styles.buttonFormText
                  : { ...styles.buttonFormText, ...styles.activeButtonFormText }
              }
            >
              Publish
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styleRemoveBtn}
            onPress={() => {
              setState(INITIAL_POST);
              hideKeyboard();
            }}
            disabled={!state.photoUri}
          >
            <AntDesign
              name="delete"
              size={24}
              color={!state.photoUri ? styles.removeBtn.fill : styles.activeRemoveBtn.fill}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
