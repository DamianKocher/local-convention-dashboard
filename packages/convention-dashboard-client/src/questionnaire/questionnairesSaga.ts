import {createSaga} from "../utils/saga.ts";
import {setView, View} from "../app/appSlice.ts";
import {put, takeLatest} from "typed-redux-saga";
import {setQuestionnaires} from "./questionnaireSlice.ts";
import {loadQuestionnaires} from "./questionnaireApi.ts";

export const {
    a: goToQuestionnaires,
    s: goToQuestionnairesSaga
} = createSaga('questionnaires/goToQuestionnaires', function* () {
    try {
        yield* put(setView(View.QUESTIONNAIRE));

        const questionnaires = yield* loadQuestionnaires();
        yield* put(setQuestionnaires(questionnaires));
    } catch (e) {
        console.error(e)
        yield* put(setView(View.MENU));
    }
})

export function* watchQuestionnairesSaga() {
    yield* takeLatest(goToQuestionnaires, goToQuestionnairesSaga);
}