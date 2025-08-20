import {useAppSelector} from "./store/store.ts";
import {getView, View} from "./app/appSlice.ts";
import {LoginView} from "./views/LoginView/LoginView.tsx";
import {DocumentsView} from "./views/DocumentsView/DocumentsView.tsx";
import {DocumentView} from "./views/DocumentView/DocumentView.tsx";
import {FormsView} from "./views/FormsView/FormsView.tsx";
import {FormView} from "./views/FormView/FormView.tsx";
import {MenuView} from "./views/MenuView/MenuView.tsx";
import {QuestionnairesView} from "./views/QuestionnairesView/QuestionnairesView.tsx";

export const App = () => {
    const view = useAppSelector(getView);

    switch (view) {
        case View.INITIAL:
            return null;
        case View.LOGIN:
            return <LoginView/>
        case View.MENU:
            return <MenuView />
        case View.DOCUMENTS:
            return <DocumentsView />;
        case View.DOCUMENT:
            return <DocumentView />;
        case View.FORMS:
            return <FormsView />;
        case View.FORM:
            return <FormView />
        case View.QUESTIONNAIRE:
            return <QuestionnairesView />
    }
};
