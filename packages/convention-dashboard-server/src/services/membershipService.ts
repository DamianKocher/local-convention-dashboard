import {Client} from "pg";
import * as z from "zod/v4";
import jwt from "jsonwebtoken";
import {completeVerificationResponseSchema, CompleteVerificationResponse} from "convention-dashboard-shared/src";
import {logger} from "../utils/logger.ts";
import {CodesService} from "./codesService.ts";
import {EmailService} from "./emailService.ts";
import {AuthorizationService} from "./authorizationService.ts";

const MemberRowSchema = z.object({
    id: z.int(),
    email: z.email(),
    full_name: z.string(),
    short_name: z.string()
});
export type Member = z.infer<typeof MemberRowSchema>;

export class MembershipService {

    private readonly db: Client;
    private readonly codesService: CodesService;
    private readonly emailService: EmailService;
    private readonly authorizationService: AuthorizationService;

    constructor(db: Client) {
        this.db = db;
        this.codesService = new CodesService(db);
        this.emailService = new EmailService();
        this.authorizationService = new AuthorizationService();
    }

    async startMembershipVerification(email: string) {
        email = email.trim().toLowerCase();
        logger.info(`starting membership verification for email: ${email}`);

        const member = await this.getMemberByEmail(email);
        if (!member) {
            logger.warn(`could not find member with email '${email}'`);
            return;
        }
        logger.info(`found member: ${member.full_name} (${member.email})`, {member});

        // nullify all previous verification codes for email
        await this.codesService.nullifyPreviousCodesForgiving(member.email);

        const verificationCode = this.codesService.generateVerificationCode();
        await this.codesService.insertVerificationCode(member.id, member.email, verificationCode);
        logger.info(`generated verification code for ${member.email}: ${verificationCode}`);

        await this.emailService.sendVerificationEmail(member.email, verificationCode);
    }

    async completeMembershipVerification(email: string, verificationCode: string): Promise<CompleteVerificationResponse> {
        email = email.trim().toLowerCase();
        logger.info(`completing membership verification for email: ${email}`)
        await this.codesService.validateCode(email, verificationCode);

        const member = await this.getMemberByEmail(email);
        if (!member) {
            throw new Error(`no member with email: ${email}`);
        }
        logger.info(`member verified: ${member.full_name} (${member.email})`, {member});

        const token = this.authorizationService.createJwt(member);

        this.emailService.sendSignInNotification(member.full_name);

        return completeVerificationResponseSchema.parse({
            shortName: member.short_name,
            fullName: member.full_name,
            token: token
        });
    }

    private async getMemberByEmail(email: string) {
        const query = 'SELECT * FROM members WHERE email = $1';
        const result = await this.db.query(query, [email]);

        if (result.rowCount === 0) {
            return null;
        }

        return MemberRowSchema.parse(result.rows[0]);
    }
}