import {z} from "zod/v4";

export const questionnaireSchema = z.object({
    id: z.number(),
    name: z.string(),
    pronouns: z.string(),
    formation: z.string(),
    startDate: z.string(),
    data: z.array(z.object({
        label: z.string(),
        value: z.string()
    }))
});

export type Questionnaire = z.infer<typeof questionnaireSchema>;

export const questionnaireResponseSchema = z.array(questionnaireSchema);