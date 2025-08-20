import {AppBar} from "../../components/AppBar/AppBar.tsx";
import {goToFormsViewAction} from "../../forms/formsSaga.ts";
import {Card} from "../../components/Card/Card.tsx";
import classes from "./MenuView.module.css"
import {goToQuestionnaires} from "../../questionnaire/questionnairesSaga.ts";

export const MenuView = () => {
    return (
        <>
            <AppBar/>

            <div className={classes.cards}>
                <Card label="Submit a questionaire or resolution." onClick={goToFormsViewAction}/>
                <Card label="View 2025-2026 formation officer questionnaires." onClick={goToQuestionnaires}/>
                {/*<Card label="View resolutions." onClick={goToDocumentsView} />*/}
            </div>
        </>
    )
}