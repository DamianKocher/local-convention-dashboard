import {
    FORM_SUBMITTED_EMAIL,
    SENDGRID_TOKEN,
    VERIFICATION_SENDER_EMAIL,
    VERIFICATION_SENDER_NAME
} from "../utils/variables.ts";
import sendgrid from "@sendgrid/mail";
import {logger} from "../utils/logger.ts";

export class EmailService {

    private readonly senderEmail: string;
    private readonly senderName: string
    private readonly sendgridToken: string;

    constructor() {
        this.senderEmail = VERIFICATION_SENDER_EMAIL;
        this.senderName = VERIFICATION_SENDER_NAME;
        this.sendgridToken = SENDGRID_TOKEN;
    }

    async sendVerificationEmail(email: string, code: string) {
        if (!this.sendgridToken) {
            logger.warn(`sendgrid token is not set.`);
            return;
        }

        sendgrid.setApiKey(this.sendgridToken)

        await sendgrid.send({
            to: email,
            from: {
                email: this.senderEmail,
                name: this.senderName
            },
            subject: `Membership Verification Code: ${code}`,
            text: `Hello,\n\nA membership verification code was requested for this email address. Enter this code in the local convention dashboard to sign-in.\n\nVerification code: ${code}`,
        });

        logger.info(`sent verification code email to ${email}`);
    }

    async sendFormSubmittedNotification(type: string, memberName: string, link: string) {
        if (!this.sendgridToken) {
            logger.warn(`sendgrid token is not set.`);
            return;
        }

        sendgrid.setApiKey(this.sendgridToken)

        await sendgrid.send({
            to: FORM_SUBMITTED_EMAIL,
            from: {
                email: this.senderEmail,
                name: this.senderName
            },
            subject: `New ${type} Form Submitted`,
            text: `A new ${type} form has been submitted by ${memberName}. Link: ${link}`,
        });
    }
}