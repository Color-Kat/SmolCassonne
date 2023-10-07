import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface GithubState {
    favourites: string[];
}

const LS_FAVOURITE_KEY = 'github_favourites';


const initialState: GithubState = {
    favourites: JSON.parse(localStorage.getItem(LS_FAVOURITE_KEY) ?? '[]')
};

export const testSlice = createSlice({
    name: 'test',
    initialState,
    reducers: {
        addFavourite(state, action: PayloadAction<string>) {
            state.favourites.push(action.payload);
            localStorage.setItem(LS_FAVOURITE_KEY, JSON.stringify(state.favourites));
        },
        removeFavourite(state, action: PayloadAction<string>) {
            state.favourites = state.favourites.filter(fav => fav !== action.payload);
            localStorage.setItem(LS_FAVOURITE_KEY, JSON.stringify(state.favourites));
        }
    }
});

export const testActions = testSlice.actions;
export const testReducer = testSlice.reducer;
