import {createSaga} from "../utils/saga.ts";
import {put, takeEvery, takeLatest} from "typed-redux-saga";
import {clearToken, loadToken} from "../utils/tokenStore.ts";
import {resetLoginState, setMembershipToken} from "../membership/membershipSlice.ts";
import {setView, View} from "./appSlice.ts";

export const {a: initializeApp, s: initializeAppSaga} = createSaga('app/initialize', function* () {
    const token = loadToken();
    if (token) {
        yield* put(setMembershipToken(token));
        yield* put(setView(View.MENU));
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

export const {a: goToMenu, s: goToMenuSaga} = createSaga('app/goToMenu', function* () {
    yield* put(setView(View.MENU));
});

export function* watchAppSaga() {
    yield* takeLatest(initializeApp.type, initializeAppSaga);
    yield* takeLatest(logout.type, logoutSaga);
    yield* takeEvery(goToMenu.type, goToMenuSaga);
}

