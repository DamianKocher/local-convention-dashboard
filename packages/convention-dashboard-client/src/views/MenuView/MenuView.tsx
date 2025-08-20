import {AppBar} from "../../components/AppBar/AppBar.tsx";
import {goToFormsViewAction} from "../../forms/formsSaga.ts";
import {Card} from "../../components/Card/Card.tsx";
import classes from "./MenuView.module.css"
import {goToQuestionnaires} from "../../questionnaire/questionnairesSaga.ts";
import {Footer} from "../../components/Footer/Footer.tsx";
import {goToDocumentsView} from "../../document/documentSaga.ts";

export const MenuView = () => {
    return (
        <>
            <AppBar/>

            <div className={classes.content}>
                <p className={classes.label}>Local Convention Dashboard</p>

                <Card label="Submit a questionaire or resolution." onClick={goToFormsViewAction}/>
                <Card label="View 2025-2026 formation officer questionnaires." onClick={goToQuestionnaires}/>
                <Card label="View resolutions." onClick={goToDocumentsView} />

                <p>
                    <a href="https://link.stldsa.org/convention_standing_rules" target="_blank">
                        Standing Rules of the 2025 St. Louis DSA Local Convention
                    </a>
                </p>
            </div>

            <Footer/>
        </>
    )
}