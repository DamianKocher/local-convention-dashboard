import {Client} from "pg";
import {questionnaireResponseSchema, questionnaireSchema} from "convention-dashboard-shared/src";

export class QuestionnaireService {

    private client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    async getQuestionnaires() {
        const result = await this.client.query('SELECT * FROM questionnaires');
        return questionnaireResponseSchema.parse(result.rows.map((questionnaire) => ({
            id: questionnaire.id,
            name: questionnaire.name,
            pronouns: questionnaire.pronouns,
            formation: questionnaire.formation,
            startDate: questionnaire.start_date,
            data: questionnaire.data ?? []
        })));
    }
}