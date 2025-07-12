import {createSelector, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {Document} from "convention-dashboard-shared/src";
import type {RootState} from "../store/store.ts";


type DocumentState = {
    selectedDocumentId: number | null;
    documents: Record<number, Document>
    documentMarkdown: Record<number, string>
}

const initialState: DocumentState = {
    selectedDocumentId: null,
    documents: {},
    documentMarkdown: {}
}

export const documentSlice = createSlice({
    name: 'document',
    initialState,
    reducers: {
        setSelectedDocumentId: (state, {payload}: PayloadAction<number | null>) => {
            state.selectedDocumentId = payload;
        },

        setDocuments: (state, {payload}: PayloadAction<Document[]>) => {
            state.documents = {};
            for (const document of payload) {
                const id = document.id;
                state.documents[id] = document;
            }
        },

        setDocument: (state, {payload}: PayloadAction<Document>) => {
            const id = payload.id;
            state.documents[id] = payload;
        },

        setDocumentMarkdown: (state, {payload}: PayloadAction<{ id: number, markdown: string }>) => {
            state.documentMarkdown[payload.id] = payload.markdown;
        },

        setSelectedDocumentSigned: (state, {payload}: PayloadAction<boolean>) => {
            const selectedDocumentId = state.selectedDocumentId;
            if (!selectedDocumentId) {
                return;
            }

            const document = state.documents[selectedDocumentId];
            if (!document) {
                return;
            }

            document.signatures.signed = payload;
            document.signatures.count.current += payload ? 1 : -1
        }
    },
    selectors: {
        getDocumentMetadata: createSelector((state: DocumentState) => state.documents, (documents) => {
            const docs = Object.values(documents);

            const documentsTotal = docs.length;
            const documentsMetRequirement = docs.filter((doc) => doc.signatures.count.metRequirement).length;
            const documentsSignedByUser = docs.filter((doc) => doc.signatures.signed).length;

            return ({
                counts: {
                    total: documentsTotal,
                    metRequirement: documentsMetRequirement,
                    signedByUser: documentsSignedByUser
                }
            });
        }),

        getDocumentsByType: createSelector(
            (state: DocumentState) => state.documents,
            (documents) => {
                const docs = Object.values(documents).sort((a, b) => a.name.localeCompare(b.name));

                const resolutions: Document[] = [];
                const amendments: Document[] = [];

                for (const document of docs) {
                    if (document.type === 'resolution') {
                        resolutions.push(document);
                    } else {
                        amendments.push(document);
                    }
                }

                return {resolutions, amendments};
            }
        ),

        getSelectedDocument: createSelector(
            (state: DocumentState) => state.documents,
            (state: DocumentState) => state.selectedDocumentId != null ? state.documents[state.selectedDocumentId] : undefined,
            (state: DocumentState) => state.selectedDocumentId != null ? state.documentMarkdown[state.selectedDocumentId] : undefined,
            (documents, document, markdown) => {
                const related = Object.values(documents).filter((d) => document?.related.includes(d.id));
                return {document, markdown, related}
            }),

        getDocuments: (state) => state.documents,
        getMarkdown: (state) => state.documentMarkdown,
    }
});

export const {
    setSelectedDocumentId,
    setDocuments,
    setDocument,
    setDocumentMarkdown,
    setSelectedDocumentSigned
} = documentSlice.actions;

export const {
    getDocumentsByType,
    getSelectedDocument,
    getDocuments,
    getMarkdown
} = documentSlice.getSelectors((state: RootState) => state.document);