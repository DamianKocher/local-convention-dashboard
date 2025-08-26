import {createSaga} from "../utils/saga.ts";
import {all, put, takeEvery, takeLatest} from "typed-redux-saga";
import {clearToken, loadToken} from "../utils/tokenStore.ts";
import {resetLoginState, setMembershipToken} from "../membership/membershipSlice.ts";
import {setView, View} from "./appSlice.ts";
import {fetchQuestionnaires} from "../questionnaire/questionnairesSaga.ts";
import {fetchDocuments, goToDocumentView} from "../document/documentSaga.ts";
import {loadForms} from "../forms/formsSaga.ts";

export const {a: initializeApp, s: initializeAppSaga} = createSaga('app/initialize', function* () {
    const token = loadToken();
    if (token) {
        yield* put(setMembershipToken(token));
        yield* put(goToMenu());

        try {
            yield* all([fetchQuestionnaires(), fetchDocuments(), loadForms()]);
        } catch (e) {
            console.error('failed to preload data', e);
        }
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
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString);

    const document = urlParams.get('document');
    if (document !== null) {
        yield* put(goToDocumentView(parseInt(document, 10)))
    } else {
        yield* put(setView(View.MENU));
    }
});

export function* watchAppSaga() {
    yield* takeLatest(initializeApp.type, initializeAppSaga);
    yield* takeLatest(logout.type, logoutSaga);
    yield* takeEvery(goToMenu.type, goToMenuSaga);
}

