import {z} from "zod/v4";

export const savedFormSchema = z.object({
    id: z.number(),
    type: z.string(),
    link: z.string(),
});

export type SavedForm = z.infer<typeof savedFormSchema>;

export const getFormsResponseSchema = z.array(savedFormSchema);

export const createFormRequestSchema = z.object({
    type: z.string(),
    link: z.string(),
});

