import {combineSlices, configureStore} from "@reduxjs/toolkit";
import {membershipSlice} from "../membership/membershipSlice.ts";
import {appSlice} from "../app/appSlice.ts";
import createSagaMiddleware from "redux-saga";
import {watchAppSaga} from "../app/appSaga.ts";
import {documentSlice} from "../document/documentSlice.ts";
import {useSelector} from "react-redux";
import {takeEvery} from "typed-redux-saga";
import {watchMembershipSaga} from "../membership/membershipSaga.ts";
import {watchDocumentSaga} from "../document/documentSaga.ts";
import {watchFormsSaga} from "../forms/formsSaga.ts";
import {formSlice} from "../forms/formSlice.ts";
import {questionnaireSlice} from "../questionnaire/questionnaireSlice.ts";
import {watchQuestionnairesSaga} from "../questionnaire/questionnairesSaga.ts";

const rootReducer = combineSlices(
    appSlice,
    documentSlice,
    membershipSlice,
    formSlice,
    questionnaireSlice
);

function* watchLoggingSaga() {
    // eslint-disable-next-line require-yield
    yield* takeEvery('*', function* (action) {
        console.log(action)
    })
}

export function setupStore() {
    const sagaMiddleware = createSagaMiddleware();


    const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware({thunk: false}).prepend(sagaMiddleware);
        },
        devTools: process.env.NODE_ENV !== 'production', // Enable devTools in development mode
    });

    sagaMiddleware.run(watchLoggingSaga);
    sagaMiddleware.run(watchAppSaga);
    sagaMiddleware.run(watchDocumentSaga);
    sagaMiddleware.run(watchMembershipSaga);
    sagaMiddleware.run(watchFormsSaga);
    sagaMiddleware.run(watchQuestionnairesSaga);

    return store;
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export const useAppSelector = useSelector.withTypes<RootState>();