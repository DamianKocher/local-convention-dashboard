import {z} from "zod/v4";

export const startVerificationRequestSchema = z.object({
    email: z.email()
});

export const completeVerificationRequestSchema = z.object({
    email: z.email(),
    code: z.string()
});

export const CompleteVerificationResponseSchema = z.object({
    shortName: z.string(),
    fullName: z.string(),
    token: z.string(),
});
export type CompleteVerificationResponse = z.infer<typeof CompleteVerificationResponseSchema>;