import {logger} from "../utils/logger.ts";
import jwt from "jsonwebtoken";
import {z} from "zod/v4";
import {Member} from "./membershipService.ts";
import {JWT_SECRET} from "../utils/variables.ts";

export class AuthorizationService {

    private static REQ_MEMBER_ID = 'memberId';
    private static REQ_FULL_NAME = 'fullName';
    private static REQ_SHORT_NAME = 'shortName';

    private readonly jwtSecret: string;

    constructor() {
        this.jwtSecret = JWT_SECRET;
    }

    createJwt(member: Member) {
        const payload = {memberId: member.id, shortName: member.short_name, fullName: member.full_name};
        return jwt.sign(payload, this.jwtSecret);
    }

    createAuthorizationMiddleware() {
        return async (req: any, res: any, next: any) => {
            const authorizationHeader = req.headers.authorization;

            logger.debug('validating jwt token', {
                authorizationHeader
            });

            const token = authorizationHeader?.split(' ').at(1);
            if (!token) {
                return res.status(401).send();
            }

            try {
                const decoded = jwt.verify(token, this.jwtSecret);
                req[AuthorizationService.REQ_MEMBER_ID] = (decoded as any).memberId;
                req[AuthorizationService.REQ_FULL_NAME] = (decoded as any).fullName;
                req[AuthorizationService.REQ_SHORT_NAME] = (decoded as any).shortname

                res.setHeader('X-Member-Name', req[AuthorizationService.REQ_FULL_NAME]);
                res.setHeader('X-Member-Id', req[AuthorizationService.REQ_MEMBER_ID]);

                next();
            } catch (error) {
                logger.error('error while validating JWT token', {error})
                return res.status(401).send();
            }
        };
    }

    getMemberId(req: any) {
        return z.int().parse(req[AuthorizationService.REQ_MEMBER_ID])
    }

    getMemberFullName(req: any) {
        return z.string().parse(req[AuthorizationService.REQ_FULL_NAME]);
    }
}