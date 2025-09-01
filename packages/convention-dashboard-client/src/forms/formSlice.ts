import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "../store/store.ts";

import type {SavedForm} from "convention-dashboard-shared/src/forms";

export const enum FormType {
    AMENDMENT = "Amendment",
}

type FormState = {
    selectedFormType: FormType;
    link: string;
    forms: SavedForm[],
};

const initialState: FormState = {
    forms: [],

    selectedFormType: FormType.AMENDMENT,
    link: ''
};

export const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        initializeFormView: (state, {payload}: PayloadAction<FormType>) => {
            state.selectedFormType = payload;
            state.link = '';
        },

        setFormLink: (state, {payload}: PayloadAction<string>) => {
            state.link = payload;
        },

        setForms: (state, {payload}: PayloadAction<SavedForm[]>) => {
            state.forms = payload;
        }
    },
    selectors: {
        getSelectedFormType: (state: FormState) => state.selectedFormType,
        getFormLink: (state: FormState) => state.link,
        getForms: (state: FormState) => state.forms,
        getHasForms: (state: FormState) => state.forms.length > 0,
    }
});

export const {initializeFormView, setFormLink, setForms} = formSlice.actions;

export const {getSelectedFormType, getFormLink, getForms, getHasForms} = formSlice.getSelectors((state: RootState) => state.form);