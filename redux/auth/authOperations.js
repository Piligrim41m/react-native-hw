import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { auth } from '../../firebase/config';
import { updateUserProfile, authStateChange, authSignOut } from './authReducer';

export const authSignUpUser =
  ({ login, email, password }) =>
  async (dispatch, state) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const user = auth.currentUser;
      // console.log(user)

      await updateProfile(user, {
        displayName: login,
        // photoURL: 'https://example.com/jane-q-user/profile.jpg',
      });

      const { uid, displayName, email: emailBase } = await auth.currentUser;

      const userProfile = {
        userId: uid,
        login: displayName,
        email: emailBase,
      };

      dispatch(updateUserProfile(userProfile));
    } catch (error) {
      console.log(error.message);
    }
  };

export const authSignInUser =
  ({ login, email, password }) =>
  async (dispatch, state) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log('user authSignInUser', user);
    } catch (error) {
      console.log(error.message);
    }
  };

export const authStateChangeUser = () => async (dispatch, state) => {
  await onAuthStateChanged(auth, user => {
    if (user) {
      const userProfile = {
        userId: user.uid,
        login: user.displayName,
      };

      dispatch(authStateChange({ stateChange: true }));
      dispatch(updateUserProfile(userProfile));
    }
  });
};

export const authSignOutUser = () => async (dispatch, state) => {
  await signOut(auth);

  dispatch(authSignOut());
};
