import type {Questionnaire} from "convention-dashboard-shared/src";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "../store/store.ts";

type QuestionnaireState = {
    questionnaires: Questionnaire[]
}

const initialState: QuestionnaireState = {
    questionnaires: []
}

export const questionnaireSlice = createSlice({
    name: 'questionnaires',
    initialState,
    reducers: {
        setQuestionnaires: (state, {payload}: PayloadAction<Questionnaire[]>) => {
            state.questionnaires = payload;
        }
    },
    selectors: {
        getQuestionnaires: (state) => {
            return state.questionnaires;
        }
    }
});

export const {setQuestionnaires} = questionnaireSlice.actions;

export const {getQuestionnaires} = questionnaireSlice.getSelectors((state: RootState) => state.questionnaires);