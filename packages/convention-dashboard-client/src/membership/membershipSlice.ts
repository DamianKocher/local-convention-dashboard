import {createSelector, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "../store/store.ts";
import {parseToken} from "../utils/token.ts";
import emailValidator from "email-validator";

export const enum LoginStage {
    EMAIL,
    CODE,
    ERROR,
    LOADING
}

type MembershipState = {
    login: {
        stage: LoginStage,
        error: string;
        email: string;
        code: string;
        failedCodeAttempts: number;
    },

    token: string | null;
    shortName: string | null;
    fullName: string | null;
}

const initialState: MembershipState = {
    login: {
        stage: LoginStage.EMAIL,
        email: '',
        code: '',
        error: '',
        failedCodeAttempts: 0
    },

    token: null,
    shortName: null,
    fullName: null
}

export const membershipSlice = createSlice({
    name: 'membership',
    initialState,
    reducers: {
        resetLoginState: (state) => {
            state.login.stage = LoginStage.EMAIL;
            state.login.email = "";
            state.login.code = "";
            state.login.error = "";
        },

        setLoginStage: (state, {payload}: PayloadAction<LoginStage>) => {
            state.login.stage = payload;
        },
        setEmail: (state, {payload}: PayloadAction<string>) => {
            state.login.email = payload;
        },
        setCode: (state, {payload}: PayloadAction<string>) => {
            state.login.code = payload;
        },
        setError: (state, {payload}: PayloadAction<string>) => {
            state.login.error = payload;
        },
        resetCodeFailedAttempts: (state) => {
            state.login.failedCodeAttempts = 0;
        },
        incrementCodeFailedAttempts: (state) => {
            state.login.failedCodeAttempts += 1;
        },

        setMembershipToken: (state, {payload}: PayloadAction<string | null>) => {
            if (payload) {
                state.token = payload;

                const parsed = parseToken(payload);
                state.shortName = parsed.shortName;
                state.fullName = parsed.fullName;
            } else {
                state.token = null;
                state.fullName = null;
                state.shortName = null;
            }

        }
    },
    selectors: {
        getLoginState: createSelector(
            (state: MembershipState) => state.login,
            (login) => {
                const isEmailValid = emailValidator.validate(login.email);
                const isCodeValid = login.code.length === 7;

                return {
                    stage: login.stage,
                    email: login.email,
                    isEmailValid: isEmailValid,
                    code: login.code,
                    isCodeValid: isCodeValid,
                    error: login.error,
                    failedCodeAttempts: login.failedCodeAttempts
                }
            }),

        getMembershipToken: (state) => state.token,
        getShortName: (state) => state.shortName,
        getFullName: (state) => state.fullName,
    }
});

export const {
    resetLoginState,
    setLoginStage,
    setEmail,
    setCode,
    setError,
    setMembershipToken,
    resetCodeFailedAttempts,
    incrementCodeFailedAttempts
} = membershipSlice.actions;

export const {
    getLoginState,
    getMembershipToken,
    getShortName,
    getFullName
} = membershipSlice.getSelectors((state: RootState) => state.membership);