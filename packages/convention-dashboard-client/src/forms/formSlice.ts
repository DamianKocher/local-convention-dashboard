import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "../store/store.ts";

import type {SavedForm} from "convention-dashboard-shared/src/forms";

export const enum FormType {
    EC = "Executive Committee Questionnaire",
    FORMATION = "Formation Co-Chair Questionnaire",
    RESOLUTION = "Resolution"
}

type FormState = {
    selectedFormType: FormType;
    link: string;
    forms: SavedForm[],
};

const initialState: FormState = {
    forms: [],

    selectedFormType: FormType.EC,
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
        getForms: (state: FormState) => state.forms
    }
});

export const {initializeFormView, setFormLink, setForms} = formSlice.actions;

export const {getSelectedFormType, getFormLink, getForms} = formSlice.getSelectors((state: RootState) => state.form);