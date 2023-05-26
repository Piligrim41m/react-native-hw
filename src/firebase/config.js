import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth/react-native';

const firebaseConfig = {
  apiKey: 'AIzaSyBNFeOeT1RrYP79Ban8v3I2ejLG7zNX3j0',
  authDomain: 'rn-social-8b531.firebaseapp.com',
  databaseURL: 'https://rn-social-8b531-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'rn-social-8b531',
  storageBucket: 'rn-social-8b531.appspot.com',
  messagingSenderId: '840508705981',
  appId: '1:840508705981:web:f0a1de0ae48b210fe2fbd4',
  measurementId: 'G-WC9DSJMDBR',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
