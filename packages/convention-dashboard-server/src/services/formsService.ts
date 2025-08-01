import {Client} from "pg";
import {getFormsResponseSchema} from "convention-dashboard-shared/src/forms.ts";

export class FormsService {

    private client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    async getFormsByMemberId(memberId: number) {
        const result = await this.client.query('SELECT id, type, link FROM forms WHERE member_id = $1', [memberId]);
        return getFormsResponseSchema.parse(result.rows);
    }

    async deleteFormById(formId: string) {
        const result = await this.client.query('DELETE FROM forms WHERE id = $1', [formId]);
        if (result.rowCount === 0) {
            throw new Error(`Form with id ${formId} not found`);
        }
    }

    async createForm(memberId: number, type: string, link: string) {
        await this.client.query(
            'INSERT INTO forms (member_id, type, link) VALUES ($1, $2, $3)',
            [memberId, type, link]
        );
    }
}