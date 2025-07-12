import {request} from "../utils/request.ts";
import {z} from "zod/v4";
import {DocumentSchema, DocumentMarkdownResponseSchema} from "convention-dashboard-shared/src";

export function getAllDocuments() {
    return request({
        endpoint: '/api/documents',
        method: 'GET',
        authenticated: true,
        responseSchema: z.array(DocumentSchema)
    });
}

export function getDocument(id: number) {
    return request({
        endpoint: `/api/documents/${id}`,
        method: 'GET',
        authenticated: true,
        responseSchema: DocumentSchema
    });
}

export function getDocumentMarkdown(id: number) {
    return request({
        endpoint: `/api/documents/${id}/markdown`,
        method: 'GET',
        authenticated: true,
        responseSchema: DocumentMarkdownResponseSchema
    });
}


export function signDocument(id: number) {
    return request({
        endpoint: `/api/documents/${id}/sign`,
        method: 'PUT',
        authenticated: true,
        responseSchema: z.void()
    });
}

export function unsignDocument(id: number) {
    return request({
        endpoint: `/api/documents/${id}/unsign`,
        method: 'PUT',
        authenticated: true,
        responseSchema: z.void()
    });
}