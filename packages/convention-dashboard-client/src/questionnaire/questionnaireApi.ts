import {request} from "../utils/request.ts";
import {questionnaireResponseSchema} from "convention-dashboard-shared/src";

export function loadQuestionnaires() {
    return request({
        endpoint: '/api/questionnaires',
        method: 'GET',
        authenticated: true,
        responseSchema: questionnaireResponseSchema
    });
}