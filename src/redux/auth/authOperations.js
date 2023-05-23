import { auth } from "../../firabase/config";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import { authSlice } from "./authReducer";

export const authSignUpUser = ({nickname, email, password, avatar}) => async (dispatch, getState) => {
    try{
        await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(
            auth.currentUser,
            { displayName: nickname }
        )
        try {
            await updateProfile(
                auth.currentUser,
                {photoURL: avatar,}
            )
        } catch (err) {
            console.log(err.message);
            alert(err.message);
        }

        const { uid, displayName } = await auth.currentUser;
        dispatch(authSlice.actions.updateUserProfile({
            userId: uid,
            nickName: displayName,
            avatar: avatar,
        }))
        } 
    catch (err) {
        console.log(err.message);
        alert(err.message);
    }
};

export const authSignInUser = ({email, password}) => async (dispatch, getState) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        const { uid, displayName } = await auth.currentUser;
        dispatch(authSlice.actions.updateUserProfile({
            userId: uid,
            nickName: displayName,
        }))
    } 
    catch (err) {
        console.log(err.message)
        alert(err.message)
    }
};

export const authSignOutUser = () => async (dispatch, getState) => {
    try {
        await auth.signOut();
        dispatch(authSlice.actions.authSignOut())
    } catch (err) {
        console.log(err.message);
        alert(err.message);
    }
    
};

export const authStateChangeUser = () => async (dispatch, getState) => {
    try {
        await onAuthStateChanged(auth, user => {
            if (user) {
                const { uid, displayName, photoURL } = auth.currentUser;
                dispatch(authSlice.actions.updateUserProfile({
                    userId: uid,
                    nickName: displayName,
                    avatar: photoURL,
                }));
                dispatch(authSlice.actions.authStateChange({ currentState: true }));
            };
        })
    } catch (err) {
        console.log(err.message);
        alert(err.message)
    }
};

export const profileUpdateAvatar = ({ avatar }) => async (dispatch, getState) => {
    try {
        await updateProfile(
            auth.currentUser,
            { photoURL: avatar, }
        )
        const { uid, displayName, photoURL } = auth.currentUser;
        dispatch(authSlice.actions.updateUserProfile({
            userId: uid,
            nickName: displayName,
            avatar: photoURL,
        }));
    } catch (err) {
        console.log(err.message);
        alert(err.message);
    }
}
