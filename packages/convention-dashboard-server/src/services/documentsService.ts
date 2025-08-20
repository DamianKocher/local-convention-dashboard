import {
    Document, DocumentMarkdownResponse, DocumentMarkdownResponseSchema,
    DocumentSchema,
} from "convention-dashboard-shared/src";
import {Client} from "pg";
import {logger} from "../utils/logger.ts";

export class DocumentsService {

    private client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    async getAllDocuments(memberId: number): Promise<Document[]> {
        return this.fetchDocuments(memberId);
    }

    async getDocumentById(id: number, memberId: number): Promise<Document> {
        const documents = await this.fetchDocuments(memberId, id);
        if (documents.length === 0) {
            throw new Error(`Document with ID ${id} not found`);
        }
        return documents[0];
    }

    private async fetchDocuments(memberId: number, documentId?: number): Promise<Document[]> {
        logger.info(`Fetching documents for member ID ${memberId} with document ID ${documentId}`);

        const query = `
            SELECT d.id,
                   d.name,
                   d.description,
                   d.type,
                   d.co_authors,
                   d.signatures_required,
                   d.relates_to,
                   COUNT(s.id)                                      AS signatures_count,
                   COUNT(CASE WHEN s.member_id = $1 THEN 1 END) > 0 AS signed_by_user,
                   STRING_AGG(m.short_name, ',')                    AS signed_by,
                   STRING_AGG(r.id::text, ',')                      AS related
            FROM documents d
                     LEFT JOIN signatures s ON d.id = s.document_id
                     LEFT JOIN members m ON s.member_id = m.id AND m.id != $1
                     LEFT JOIN documents r ON r.relates_to = d.id
            WHERE ($2::integer IS NULL OR d.id = $2::integer)
            GROUP BY d.id, d.name
            ORDER BY d.name, d.id
        `;

        const params = [memberId, documentId];
        const result = await this.client.query(query, params);

        return result.rows.map(row => {
            const currentSignaturesCount = parseInt(row.signatures_count, 10);
            const requiredSignaturesCount = parseInt(row.signatures_required, 10);
            const metSignatureRequirement = currentSignaturesCount >= requiredSignaturesCount;

            const signedBy = row.signed_by?.split(',')?.sort() ?? [] as string[];

            const related: number[] = row.related?.split(',').map((related: string) => parseInt(related)) ?? [];

            if (row.relates_to != null) {
                related.push(row.relates_to)
            }

            return (
                DocumentSchema.parse({
                    id: row.id,
                    name: row.name,
                    description: row.description,
                    coauthors: row.co_authors.split(','),

                    type: row.type,

                    signatures: {
                        count: {
                            current: currentSignaturesCount,
                            required: requiredSignaturesCount,
                            metRequirement: metSignatureRequirement
                        },
                        signed: row.signed_by_user,
                        signedBy: signedBy
                    },

                    related: related
                })
            )
        });
    }

    async getDocumentMarkdown(id: number): Promise<DocumentMarkdownResponse> {
        logger.info(`Fetching markdown for document ID ${id}`);

        const query = 'SELECT markdown FROM documents WHERE id = $1';
        const result = await this.client.query(query, [id]);

        if (result.rows.length === 0) {
            throw new Error(`Document with ID ${id} not found`);
        }

        return DocumentMarkdownResponseSchema.parse({
            markdown: result.rows[0].markdown
        });
    }

    async signDocument(id: number, memberId: number) {
        const query = 'INSERT INTO signatures (document_id, member_id) VALUES ($1, $2)';
        await this.client.query(query, [id, memberId]);
    }

    async unsignDocument(id: number, memberId: number) {
        const query = 'DELETE FROM signatures WHERE document_id = $1 AND member_id = $2';
        const result = await this.client.query(query, [id, memberId]);

        if (result.rowCount === 0) {
            throw new Error(`No signature found for document ID ${id} by member ID ${memberId}`);
        }
    }
}