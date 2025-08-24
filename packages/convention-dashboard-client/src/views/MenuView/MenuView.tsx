import {AppBar} from "../../components/AppBar/AppBar.tsx";
import {goToFormsViewAction, goToFormViewAction} from "../../forms/formsSaga.ts";
import {ButtonCard} from "../../components/ButtonCard/ButtonCard.tsx";
import classes from "./MenuView.module.css"
import {goToQuestionnaires} from "../../questionnaire/questionnairesSaga.ts";
import {Footer} from "../../components/Footer/Footer.tsx";
import {goToDocumentsView} from "../../document/documentSaga.ts";
import {FormType} from "../../forms/formSlice.ts";
import {Link} from "../../components/Link/Link.tsx";

export const MenuView = () => {
    return (
        <>
            <AppBar/>

            <div className={classes.content}>
                <h1>Local Convention Dashboard</h1>

                <div className={classes.section}>
                    <h2>Resolutions</h2>
                    <ButtonCard label="View Resolutions" action={goToDocumentsView()}/>
                    <ButtonCard label="Submit a Resolution" action={goToFormViewAction(FormType.RESOLUTION)}/>
                </div>

                <div className={classes.section}>
                    <h2>Questionnaires</h2>
                    <ButtonCard label="View Questionnaires" action={goToQuestionnaires()}/>
                    <ButtonCard label="Submit an Executive Commitee Questionnaire"
                                action={goToFormViewAction(FormType.EC)}/>
                    <ButtonCard label="Submit a Formation Officer Questionnaire"
                                action={goToFormViewAction(FormType.FORMATION)}/>
                </div>

                <div className={classes.section}>
                    <h2>Miscellaneous</h2>
                    <ButtonCard label="View Your Form Submissions"
                                action={goToFormsViewAction()}/>

                    <Link url="https://link.stldsa.org/convention_standing_rules">
                        Standing Rules of the 2025 St. Louis DSA Local Convention
                    </Link>
                </div>
            </div>

            <Footer/>
        </>
    )
}