import {request} from "../utils/request.ts";
import {CompleteVerificationResponseSchema} from "convention-dashboard-shared/src";
import {z} from "zod/v4";

export function startMembershipVerification(email: string) {
    return request({
        endpoint: '/api/membership/verification/start',
        method: 'POST',
        authenticated: true,
        query: {email},
        responseSchema: z.void()
    });
}

export function completeMembershipVerification(email: string, code: string) {
    return request({
        endpoint: '/api/membership/verification/complete',
        method: 'POST',
        authenticated: true,
        query: {email, code},
        responseSchema: CompleteVerificationResponseSchema
    });
}