import express from "express";
import {SlackService} from "../services/slackService.ts";
import {Client} from "pg";
import {AuthorizationService} from "../services/authorizationService.ts";
import {z} from "zod/v4";

export function createSlackRouter(client: Client) {
    const router = express.Router();

    const slackService = new SlackService(client);

    const authorizationService = new AuthorizationService();
    const authorizationMiddleware = authorizationService.createAuthorizationMiddleware();
    router.use(authorizationMiddleware);

    router.post('/post/resolution', async (req, res) => {
        const {documentId, channelId} = z.object({
            documentId: z.number().gte(0),
            channelId: z.string()
        }).parse(req.body);

        await slackService.sendDocumentToSlackChannel(documentId, channelId);
        res.status(201).json({message: 'document posted to slack channel'});
    });

    return router;
}