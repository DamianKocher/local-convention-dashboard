import {request} from "../utils/request.ts";
import {savedFormSchema} from "convention-dashboard-shared/src";
import {z} from "zod/v4";

export function getForms() {
    return request({
        endpoint: '/api/forms',
        method: 'GET',
        authenticated: true,
        responseSchema: z.array(savedFormSchema)
    });
}

export function createForm(type: string, link: string) {
    return request({
        endpoint: '/api/forms',
        method: 'POST',
        authenticated: true,
        query: {
            type,
            link
        },
        responseSchema: z.void()
    });
}

export function deleteForm(id: number) {
    return request({
        endpoint: `/api/forms/${String(id)}`,
        method: 'DELETE',
        authenticated: true,
        responseSchema: z.void()
    });
}