import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: 'checking',
    uid: null,
    email: null,
    displayName: null,
    photoUrl: null,
    errorMessage: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        register: (state, action) => {
            // Solo guardamos el email al registrarse; no autenticamos automáticamente
            state.email = action.payload.email
        },
        login: (state, action) => {
            const { uid, email, displayName, photoUrl } = action.payload
            state.status = 'authenticated'
            state.uid = uid
            state.email = email
            state.displayName = displayName
            state.photoUrl = photoUrl
            state.errorMessage = null
        },
        logout: (state, action) => {
            state.status = 'not-authenticated'
            state.uid = null
            state.email = null
            state.displayName = null
            state.photoUrl = null
            state.errorMessage = action?.payload?.errorMessage || null
        },
        checkingCredentials: (state, action) => {
            state.status = 'checking'
        }
    }
})

export const { register, logout, checkingCredentials, login } = authSlice.actions