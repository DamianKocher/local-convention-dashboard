import {
    FORM_SUBMITTED_EMAILS, GENERIC_SENDER_EMAIL, GENERIC_SENDER_NAME, RECORD_EMAILS,
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
        await this.sendEmail({
            to: email,
            from: {
                email: this.senderEmail,
                name: this.senderName
            },
            subject: `STL DSA Membership Verification Code: ${code}`,
            text: `Hello,\n\nA membership verification code was requested for this email address. Enter this code in the local convention dashboard to sign-in.\n\nVerification code: ${code}`,
        });

        logger.info(`sent verification code email to ${email}`);
    }

    async sendFormSubmittedNotification(type: string, memberName: string, link: string) {
        await this.sendEmail({
            to: FORM_SUBMITTED_EMAILS,
            from: {
                email: GENERIC_SENDER_EMAIL,
                name: GENERIC_SENDER_NAME
            },
            subject: `New ${type} Form Submitted`,
            text: `A new ${type} form has been submitted by ${memberName}. Link: ${link}`,
        });
    }

    async sendSignedDocumentNotification(documentName: string, memberName: string) {
        await this.sendEmail({
            to: RECORD_EMAILS,
            from: {
                email: GENERIC_SENDER_EMAIL,
                name: GENERIC_SENDER_NAME
            },
            subject: `Document "${documentName}" signed by ${memberName}`,
            text: `Document "${documentName}" has been signed by ${memberName}}.`,
        });
    }

    async sendUnsignDocumentNotification(documentName: string, memberName: string) {
        await this.sendEmail({
            to: RECORD_EMAILS,
            from: {
                email: GENERIC_SENDER_EMAIL,
                name: GENERIC_SENDER_NAME
            },
            subject: `Document "${documentName}" unsigned by ${memberName}`,
            text: `Document "${documentName}" has been unsigned by ${memberName}}.`,
        });
    }

    async sendSignInNotification(memberName: string) {
        await this.sendEmail({
            to: RECORD_EMAILS,
            from: {
                email: GENERIC_SENDER_EMAIL,
                name: GENERIC_SENDER_NAME
            },
            subject: `Member ${memberName} signed in`,
            text: `${memberName} has signed in to the local convention dashboard.`,
        });
    }

    private async sendEmail(params: sendgrid.MailDataRequired) {
        if (!this.sendgridToken) {
            logger.warn(`sendgrid token is not set.`);
            return;
        }

        if (!params.to) {
            return;
        }

        sendgrid.setApiKey(this.sendgridToken)

        await sendgrid.send(params);
        logger.info(`sent email to ${params.to} with subject "${params.subject}"`);
    }
}