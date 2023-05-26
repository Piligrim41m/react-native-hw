import {createSlice} from "@reduxjs/toolkit";

const nullState = {
    userId: null,
    login: null,
    stateChange: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: nullState,
    reducers: {
        updateUserProfile: (state, {payload}) => ({
            ...state,
            userId: payload.userId,
            login: payload.login,
            avatar: payload.avatar,
        }),

        authStateChange: (state, {payload}) => ({
            ...state, stateChange: payload.currentState
        }),

        authSignOut: () => nullState,
    },
})
