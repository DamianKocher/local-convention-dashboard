import {useAppSelector} from "./store/store.ts";
import {getView, View} from "./app/appSlice.ts";
import {LoginView} from "./views/LoginView/LoginView.tsx";
import {DocumentsView} from "./views/DocumentsView/DocumentsView.tsx";
import {DocumentView} from "./views/DocumentView/DocumentView.tsx";

export const App = () => {
    const view = useAppSelector(getView);

    switch (view) {
        case View.INITIAL:
            return null;
        case View.LOGIN:
            return <LoginView/>
        case View.DOCUMENTS:
            return <DocumentsView />;
        case View.DOCUMENT:
            return <DocumentView />;
    }
};
