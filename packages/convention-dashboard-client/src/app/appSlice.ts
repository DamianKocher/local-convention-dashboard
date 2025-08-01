import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "../store/store.ts";

export const enum View {
    INITIAL,
    LOGIN,
    DOCUMENTS,
    DOCUMENT,
    FORMS,
    FORM
}

type AppState = {
    view: View
}

const initialState: AppState = {
    view: View.INITIAL
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setView: (state, {payload}: PayloadAction<View>) => {
            state.view = payload;
        }
    },
    selectors: {
        getView: (state) => state.view,
    }
});

export const {setView} = appSlice.actions;

export const {getView} = appSlice.getSelectors((state: RootState) => state.app);