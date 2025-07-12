import express from "express";
import {
    completeVerificationRequestSchema,
    startVerificationRequestSchema
} from "convention-dashboard-shared/src/membership.ts";
import {Client} from "pg";
import {MembershipService} from "../services/membershipService.ts";
import {sleep} from "../utils/sleep.ts";

export function createMembershipRouter(db: Client) {
    const router = express.Router();

    const membershipService = new MembershipService(db);

    router.post('/verification/start', async (req, res) => {
        const {email} = startVerificationRequestSchema.parse(req.query);

        await Promise.all([
            membershipService.startMembershipVerification(email),
            sleep(100 + Math.random() * 100) // prevent timing based attacks to identify member emails https://en.wikipedia.org/wiki/Timing_attack
        ])
        res.status(200).send();
    });

    router.post('/verification/complete', async (req, res) => {
        const {email, code} = completeVerificationRequestSchema.parse(req.query);

        const result = await membershipService.completeMembershipVerification(email, code);
        res.status(200).json(result);
    });

    return router;
}