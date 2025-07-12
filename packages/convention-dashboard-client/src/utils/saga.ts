import {createAction, type PayloadAction} from "@reduxjs/toolkit";

export function createSaga<TPayload = void, TType extends string = string>(type: TType, saga: (action: PayloadAction<TPayload, TType>) => Generator) {
    const actionCreator = createAction<TPayload, TType>(type);
    return {a: actionCreator, s: saga};
}