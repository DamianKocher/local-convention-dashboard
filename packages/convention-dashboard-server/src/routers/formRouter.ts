import {Client} from "pg";
import express from "express";
import {AuthorizationService} from "../services/authorizationService.ts";
import {FormsService} from "../services/formsService.ts";
import {createFormRequestSchema} from "convention-dashboard-shared/src/forms.ts";
import {EmailService} from "../services/emailService.ts";

export function createFormRouter(client: Client) {
    const router = express.Router();

    const authorizationService = new AuthorizationService();
    const authorizationMiddleware = authorizationService.createAuthorizationMiddleware();
    router.use(authorizationMiddleware);

    const emailService = new EmailService();

    const formsService = new FormsService(client);

    router.get('/', async (req, res) => {
        const memberId = authorizationService.getMemberId(req);
        const forms = await formsService.getFormsByMemberId(memberId);
        res.status(200).json(forms);
    });

    router.delete('/:id', async (req, res) => {
        const formId = req.params.id;
        await formsService.deleteFormById(formId);
        res.status(204).send();
    });

    router.post('/', async (req, res) => {
        const memberId = authorizationService.getMemberId(req);
        const form = createFormRequestSchema.parse(req.query);
        await formsService.createForm(memberId, form.type, form.link);

        const memberName = authorizationService.getMemberFullName(req);
        emailService.sendFormSubmittedNotification(form.type, memberName, form.link);

        res.status(201).send();
    });

    return router;
}