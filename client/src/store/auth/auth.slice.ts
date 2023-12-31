import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface IUser {
    id: string;
    name: string;
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
    user:  {
        id: Date.now().toString(),
        name: 'ColorKat',
    }
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