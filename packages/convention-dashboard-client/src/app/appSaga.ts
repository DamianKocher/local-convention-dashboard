import {createSaga} from "../utils/saga.ts";
import {put, takeLatest} from "typed-redux-saga";
import {clearToken, loadToken} from "../utils/tokenStore.ts";
import {resetLoginState, setMembershipToken} from "../membership/membershipSlice.ts";
import {setView, View} from "./appSlice.ts";
import {goToFormsViewAction} from "../forms/formsSaga.ts";

export const {a: initializeApp, s: initializeAppSaga} = createSaga('app/initialize', function* () {
    const token = loadToken();
    if (token) {
        yield* put(setMembershipToken(token));
        yield* put(goToFormsViewAction());
    } else {
        yield* put(setView(View.LOGIN));
    }
});

export const {a: logout, s: logoutSaga} = createSaga('app/logout', function* () {
    clearToken();
    yield* put(setMembershipToken(null));
    yield* put(resetLoginState());
    yield* put(setView(View.LOGIN));
});

export function* watchAppSaga() {
    yield* takeLatest(initializeApp.type, initializeAppSaga);
    yield* takeLatest(logout.type, logoutSaga);
}

