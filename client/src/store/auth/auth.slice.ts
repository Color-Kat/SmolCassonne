import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface IUser {
    id: number;
    name: string;
    email: string;
    email_verified_at: null|string;

    role_id: Roles;

    updated_at: string;
    created_at: string;
}

export enum Roles {
    None = 1,
    Admin = 2
}

const initialState: {
    isLoading: boolean,
    user: IUser | null,
}  = {
    isLoading: true,
    user: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearUser(state, action) {
            state.user = null;
        },
        setUser(state, action: PayloadAction<IUser|null>) {
            state.user = action.payload;
            state.isLoading = false;
        }
    },
})

export const {
    setUser
} = authSlice.actions;

export const authReducer = authSlice.reducer;