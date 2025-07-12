import express from "express";
import {DocumentsService} from "../services/documentsService.ts";
import {AuthorizationService} from "../services/authorizationService.ts";
import {Client} from "pg";

export function createDocumentsRouter(client: Client) {
    const router = express.Router();

    const authorizationService = new AuthorizationService();
    const authorizationMiddleware = authorizationService.createAuthorizationMiddleware();
    router.use(authorizationMiddleware)

    const documentService = new DocumentsService(client);

    router.get('/', async (req, res) => {
        const memberId = authorizationService.getMemberId(req);

        const documents = await documentService.getAllDocuments(memberId);
        res.status(200).json(documents);
    });

    router.get('/:id', async (req, res) => {
        const documentId = parseInt(req.params.id);
        const memberId = authorizationService.getMemberId(req);

        const document = await documentService.getDocumentById(documentId, memberId);
        res.status(200).json(document);
    });

    router.get('/:id/markdown', async (req, res) => {
        const documentId = parseInt(req.params.id);

        const markdown = await documentService.getDocumentMarkdown(documentId);
        res.status(200).json(markdown);
    });

    router.put('/:id/sign', async (req, res) => {
        const documentId = parseInt(req.params.id);
        const memberId = authorizationService.getMemberId(req);

        await documentService.signDocument(documentId, memberId)
        res.status(200).send();
    });

    router.put('/:id/unsign', async (req, res) => {
        const documentId = parseInt(req.params.id);
        const memberId = authorizationService.getMemberId(req);

        await documentService.unsignDocument(documentId, memberId)
        res.status(200).send();
    });

    return router;
}