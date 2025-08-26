import {createSaga} from "../utils/saga.ts";
import {setView, View} from "../app/appSlice.ts";
import {put, takeLatest} from "typed-redux-saga";
import {setQuestionnaires} from "./questionnaireSlice.ts";
import {loadQuestionnaires} from "./questionnaireApi.ts";
import {goToMenu} from "../app/appSaga.ts";

export function* fetchQuestionnaires() {
    const questionnaires = yield* loadQuestionnaires();
    yield* put(setQuestionnaires(questionnaires));
}

export const {
    a: goToQuestionnaires,
    s: goToQuestionnairesSaga
} = createSaga('questionnaires/goToQuestionnaires', function* () {
    try {
        yield* put(setView(View.QUESTIONNAIRE));
        yield* fetchQuestionnaires();
    } catch (e) {
        console.error(e);
        yield* put(goToMenu());
    }
})

export function* watchQuestionnairesSaga() {
    yield* takeLatest(goToQuestionnaires, goToQuestionnairesSaga);
}