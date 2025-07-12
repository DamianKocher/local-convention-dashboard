import type {FetchArgs} from "@reduxjs/toolkit/query";
import {call, cancel, put, select} from "typed-redux-saga";
import * as z from "zod/v4";
import {getMembershipToken} from "../membership/membershipSlice.ts";
import {logout} from "../app/appSaga.ts";

type RequestConfig<T extends z.ZodTypeAny> = {
    endpoint: string;
    method: FetchArgs['method'],
    authenticated: boolean,
    query?: Record<string, string>,
    responseSchema: T;
}

export function* request<TSchema extends z.ZodTypeAny>(config: RequestConfig<TSchema>) {
    const method = config.method;
    const params = new URLSearchParams(config.query);

    const token = yield* select(getMembershipToken);
    const authorizationHeader = (config.authenticated && token) ? `Bearer ${token}` : '';

    const path = `${config.endpoint}?${params}`;
    const result = yield* call(fetch, path, {
        method, headers: {
            'Authorization': authorizationHeader
        }
    });

    if (result.status === 401) {
        yield* put(logout());
        yield* cancel();
    }

    if (result.status >= 300) {
        throw new Error(`request received a ${result.status} response`)
    }

    const contentType = result.headers.get("content-type");
    const schema = config.responseSchema;

    if (contentType && contentType.includes("application/json")) {
        const json = yield* call([result, result.json]);
        return schema.parse(json);
    } else {
        // this should only happen if the schema is z.void(). basically makes TS understand the result is going to be of type TSchema
        return schema.parse(undefined);
    }
}