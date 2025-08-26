import {createSaga} from "../utils/saga.ts";
import {put, select, takeLatest} from "typed-redux-saga";
import {setView, View} from "../app/appSlice.ts";
import {type FormType, getFormLink, getSelectedFormType, initializeFormView, setForms} from "./formSlice.ts";
import {createForm, deleteForm, getForms} from "./formsApi.ts";
import {goToMenu} from "../app/appSaga.ts";

export function* loadForms() {
    const forms = yield* getForms();
    yield* put(setForms(forms))
}

export const {a: goToFormsViewAction, s: goToFormsViewSaga} = createSaga('forms/goToFormsView', function* () {
    yield* put(setView(View.FORMS));

    try {
        yield* loadForms();
    } catch (e) {
        console.error(e);
        yield* put(goToMenu());
    }
});

export const {
    a: goToFormViewAction,
    s: goToFormViewSaga
} = createSaga<FormType>('forms/goToFormView', function* ({payload}) {
    yield* put(initializeFormView(payload));
    yield* put(setView(View.FORM));
});

export const {a: submitFormAction, s: submitFormSaga} = createSaga('forms/submitForm', function* () {
    try {
        const selectedFormType = yield* select(getSelectedFormType);
        const link = yield* select(getFormLink);

        yield* createForm(selectedFormType, link);
        yield* put(goToFormsViewAction());
    } catch (e) {
        console.error(e);
    }
});

export const {a: deleteFormAction, s: deleteFormSaga} = createSaga<number>('forms/deleteForm', function* ({payload}) {
    try {
        yield* deleteForm(payload);

        const forms = yield* getForms();
        yield* put(setForms(forms))
    } catch (e) {
        console.error(e);
    }
});

export function* watchFormsSaga() {
    yield* takeLatest(goToFormsViewAction.type, goToFormsViewSaga);
    yield* takeLatest(goToFormViewAction.type, goToFormViewSaga);
    yield* takeLatest(submitFormAction.type, submitFormSaga);
    yield* takeLatest(deleteFormAction.type, deleteFormSaga);
}