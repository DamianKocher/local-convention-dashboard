import * as z from "zod/v4";

export const DocumentType = z.enum(['resolution', 'amendment']);
export type DocumentType = z.infer<typeof DocumentType>;

export const DocumentSchema = z.object({
    id: z.int().gte(0),
    name: z.string(),
    description: z.string(),
    coauthors: z.array(z.string()),
    frozen: z.boolean().default(false),

    type: DocumentType,

    signatures: z.object({
        count: z.object({
            current: z.int().gte(0),
            required: z.int().gte(0),

            metRequirement: z.boolean(),
        }),

        signed: z.boolean(),
        signedBy: z.array(z.string().min(1))
    }),

    related: z.array(z.int())
});
export type Document = z.infer<typeof DocumentSchema>;

export const DocumentMarkdownResponseSchema = z.object({
    markdown: z.string(),
});
export type DocumentMarkdownResponse = z.infer<typeof DocumentMarkdownResponseSchema>;