import express, {NextFunction, Request, Response} from 'express';
import {createMembershipRouter} from "./routers/membershipRouter.ts";
import {createDocumentsRouter} from "./routers/documentsRouter.ts";
import {Client, Pool} from 'pg'
import {logger} from "./utils/logger.ts";
import {PORT} from "./utils/variables.ts";
import {createFormRouter} from "./routers/formRouter.ts";
import {createQuestionnaireRouter} from "./routers/questionnaireRouter.ts";
import {AuthorizationService} from "./services/authorizationService.ts";

(async () => {
    const app = express();
    app.use(express.json());

    const db = new Client();
    await db.connect();

    const authorizationService = new AuthorizationService();
    app.use((req: Request, res: Response, next: NextFunction) => {
        next();

        const user = authorizationService.getMemberFullNameNullable(req) ?? '???';
        const userAgent = req.headers['user-agent'] ?? '???';
        logger.info(`${req.method} ${req.path} - ${res.statusCode} [user: ${user}, user agent: ${userAgent}]`);
    });

    const membershipRouter = createMembershipRouter(db);
    app.use('/api/membership', membershipRouter);

    const documentsRouter = createDocumentsRouter(db);
    app.use('/api/documents', documentsRouter);

    const formsRouter = createFormRouter(db);
    app.use('/api/forms', formsRouter);

    const questionnairesRouter = createQuestionnaireRouter(db);
    app.use('/api/questionnaires', questionnairesRouter);

    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        const path = req.path;
        const message = err.message;
        const stack = err.stack;

        logger.error(`error in ${path} - ${message}`, {
            path,
            message,
            stack,
        });

        res.status(500).send();
    });

    app.listen(PORT, () => {
        logger.info(`server started on port ${PORT}`);
    });
})();

