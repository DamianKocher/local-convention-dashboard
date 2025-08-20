import {Client} from "pg";
import express from "express";
import {QuestionnaireService} from "../services/questionnaireService.ts";
import {AuthorizationService} from "../services/authorizationService.ts";

export function createQuestionnaireRouter(client: Client) {
    const router = express.Router();

    const authorizationService = new AuthorizationService();
    const authorizationMiddleware = authorizationService.createAuthorizationMiddleware();
    router.use(authorizationMiddleware);

    const questionnaireService = new QuestionnaireService(client);

    router.get('/', async (_req, res) => {
        res.status(200).json(await questionnaireService.getQuestionnaires())
    })

    return router;
}