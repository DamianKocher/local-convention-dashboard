import {createSaga} from "../utils/saga.ts";
import {put, select, takeLatest} from "typed-redux-saga";
import {
    getLoginState, incrementCodeFailedAttempts,
    LoginStage,
    resetCodeFailedAttempts,
    setError,
    setLoginStage,
    setMembershipToken
} from "./membershipSlice.ts";
import {completeMembershipVerification, startMembershipVerification} from "./membershipApi.ts";
import {stashToken} from "../utils/tokenStore.ts";
import {setView, View} from "../app/appSlice.ts";

export const {a: submitEmail, s: submitEmailSaga} = createSaga('membership/submitEmail', function* () {
    try {
        yield* put(setLoginStage(LoginStage.LOADING));

        const {email} = yield* select(getLoginState);
        yield* startMembershipVerification(email);

        yield* put(resetCodeFailedAttempts())
        yield* put(setLoginStage(LoginStage.CODE));
    } catch (error) {
        console.error('error', error);
        yield* put(setError('Failed to start membership verification.'))
        yield* put(setLoginStage(LoginStage.ERROR));
    }
});

export const {a: submitCode, s: submitCodeSaga} = createSaga('membership/submitCode', function* () {
    try {
        yield* put(setLoginStage(LoginStage.LOADING));

        const {email, code} = yield* select(getLoginState);
        const {token} = yield* completeMembershipVerification(email, code);
        yield* put(setMembershipToken(token));
        stashToken(token);

        yield* put(setView(View.MENU))
    } catch (error) {
        console.error('error', error);
        yield* put(incrementCodeFailedAttempts());
        yield* put(setLoginStage(LoginStage.CODE));
    }
});

export function* watchMembershipSaga() {
    yield* takeLatest(submitEmail.type, submitEmailSaga);
    yield* takeLatest(submitCode.type, submitCodeSaga);
}

