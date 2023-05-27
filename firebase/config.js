import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBNFeOeT1RrYP79Ban8v3I2ejLG7zNX3j0',
  authDomain: 'rn-social-8b531.firebaseapp.com',
  projectId: 'rn-social-8b531',
  storageBucket: 'rn-social-8b531.appspot.com',
  messagingSenderId: '840508705981',
  appId: '1:840508705981:web:f0a1de0ae48b210fe2fbd4',
  measurementId: 'G-WC9DSJMDBR',
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const myStorage = getStorage(app);
export const db = getFirestore(app);
