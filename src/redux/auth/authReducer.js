import { createSlice } from "@reduxjs/toolkit";

const state = {
        userId: null,
        nickName: null,
        stateChange: false,
        }

export const authSlice = createSlice({
    name: 'auth',
    initialState: state,
    reducers: {
        updateUserProfile: (state, { payload }) => ({
            ...state,
            userId: payload.userId,
            nickName: payload.nickName,
            avatar: payload.avatar,
        }),
        authStateChange: (state, { payload }) => ({
            ...state,
            stateChange: payload.currentState,
        }),
        authSignOut: () => state
    }
})