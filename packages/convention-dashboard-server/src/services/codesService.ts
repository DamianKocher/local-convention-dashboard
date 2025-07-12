import {customAlphabet} from "nanoid";
import {Client} from "pg";
import {logger} from "../utils/logger.ts";

export class CodesService {

    private static idGenerator = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz');

    private db: Client;

    constructor(db: Client) {
        this.db = db;
    }

    public generateVerificationCode() {
        const part1 = CodesService.idGenerator(3);
        const part2 = CodesService.idGenerator(3);
        return `${part1}-${part2}`;
    }

    async nullifyPreviousCodes(email: string) {
        const query = 'UPDATE verifications SET is_nullified = true WHERE email = $1';
        await this.db.query(query, [email]);
        logger.info(`nullified previous verification codes for email: ${email}`);
    }

    async insertVerificationCode(memberId: number, email: string, code: string) {
        const query = 'INSERT INTO verifications (member_id, email, code) VALUES ($1, $2, $3)';
        await this.db.query(query, [memberId, email, code]);
        logger.info(`inserted verification code for member id: ${memberId}, email: ${email}`);
    }

    async validateCode(email: string, code: string) {
        const query = 'SELECT * FROM verifications WHERE email = $1 AND code = $2 AND is_nullified = false';
        const result = await this.db.query(query, [email, code]);

        if (result.rowCount === 0) {
            throw new Error(`invalid verification code for email: ${email}`);
        }

        logger.info(`validated verification code for email: ${email}`);
        await this.nullifyPreviousCodes(email);
    }
}