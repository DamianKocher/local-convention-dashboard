import {setView, View} from "../app/appSlice.ts";
import {put, select, takeEvery, takeLatest} from "typed-redux-saga";
import {createSaga} from "../utils/saga.ts";
import {getAllDocuments, getDocument, getDocumentMarkdown, signDocument, unsignDocument} from "./documentApi.ts";
import {
    getMarkdown,
    getSelectedDocument,
    setDocument,
    setDocumentMarkdown,
    setDocuments,
    setSelectedDocumentId, setSelectedDocumentSigned
} from "./documentSlice.ts";

type FetchDocumentData = { id: number; reload: boolean };

export function* fetchDocuments() {
    const documents = yield* getAllDocuments();
    yield* put(setDocuments(documents));
}

export const {a: goToDocumentsView, s: goToDocumentsViewSaga} = createSaga('document/goToDocumentsView', function* () {
    try {
        yield* put(setSelectedDocumentId(null));
        yield* put(setView(View.DOCUMENTS));
        yield* fetchDocuments();
    } catch (e) {
        console.error(e);
    }
});

export const {
    a: goToDocumentView,
    s: goToDocumentViewSaga
} = createSaga<number>('document/goToDocumentView', function* ({payload}) {
    yield* put(loadDocumentMarkdown({id: payload, reload: true}));

    yield* put(setSelectedDocumentId(payload));
    yield* put(setView(View.DOCUMENT));

    try {
        const document = yield* getDocument(payload);
        yield* put(setDocument(document));
    } catch (e) {
        console.error(e);
    }
});

export const {
    a: signSelectedDocument,
    s: signSelectedDocumentSaga
} = createSaga('document/signSelectedDocument', function* () {
    const {document} = yield* select(getSelectedDocument);
    if (!document) {
        return;
    }

    try {
        yield* put(setSelectedDocumentSigned(true));
        yield* signDocument(document.id);
    } catch (e) {
        console.error(e);

        try {
            const updatedDocument = yield* getDocument(document.id);
            yield* put(setDocument(updatedDocument));
        } catch (error) {
            console.error(error);
            yield* put(setSelectedDocumentSigned(false)); // rollback optimistic update
        }
    }
});

export const {
    a: unsignSelectedDocument,
    s: unsignSelectedDocumentSaga
} = createSaga('document/unsignSelectedDocument', function* () {
    const {document} = yield* select(getSelectedDocument);
    if (!document) {
        return;
    }

    try {
        yield* put(setSelectedDocumentSigned(false));
        yield* unsignDocument(document.id);
    } catch (e) {
        console.error(e);

        try {
            const updatedDocument = yield* getDocument(document.id);
            yield* put(setDocument(updatedDocument));
        } catch (error) {
            console.error(error);
            yield* put(setSelectedDocumentSigned(true)); // rollback optimistic update
        }
    }
});

export const {
    a: preloadDocument,
    s: preloadDocumentSaga
} = createSaga<number>('document/preload', function* ({payload}) {
    const id = payload;

    yield* put(loadDocumentMarkdown({id, reload: false}));
});

export const {
    a: loadDocumentMarkdown,
    s: loadDocumentMarkdownSaga
} = createSaga<FetchDocumentData>('document/loadMarkdown', function* ({payload}) {
    const {id, reload} = payload;

    const markdownById = yield* select(getMarkdown);
    if (markdownById[id] != undefined && !reload) {
        return;
    }

    try {
        const markdown = yield* getDocumentMarkdown(id);
        yield* put(setDocumentMarkdown({id: id, markdown: markdown.markdown}));
    } catch (e) {

    }
});

export function* watchDocumentSaga() {
    yield* takeLatest(goToDocumentsView.type, goToDocumentsViewSaga);
    yield* takeLatest(goToDocumentView.type, goToDocumentViewSaga);
    yield* takeEvery(loadDocumentMarkdown.type, loadDocumentMarkdownSaga);
    yield* takeEvery(preloadDocument.type, preloadDocumentSaga);
    yield* takeLatest(signSelectedDocument.type, signSelectedDocumentSaga);
    yield* takeLatest(unsignSelectedDocument.type, unsignSelectedDocumentSaga);
}