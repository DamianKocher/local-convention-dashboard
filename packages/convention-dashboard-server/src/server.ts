import express, {NextFunction, Request, Response} from 'express';
import {createMembershipRouter} from "./routers/membershipRouter.ts";
import {createDocumentsRouter} from "./routers/documentsRouter.ts";
import {Client, Pool} from 'pg'
import {logger} from "./utils/logger.ts";
import {PORT} from "./utils/variables.ts";
import {createFormRouter} from "./routers/formRouter.ts";

(async () => {
    const app = express();
    app.use(express.json());

    const db = new Client();
    await db.connect();

    const membershipRouter = createMembershipRouter(db);
    app.use('/api/membership', membershipRouter);

    const documentsRouter = createDocumentsRouter(db);
    app.use('/api/documents', documentsRouter);

    const formsRouter = createFormRouter(db);
    app.use('/api/forms', formsRouter);

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

