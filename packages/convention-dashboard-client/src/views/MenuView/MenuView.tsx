import {AppBar} from "../../components/AppBar/AppBar.tsx";
import {goToFormsViewAction, goToFormViewAction} from "../../forms/formsSaga.ts";
import {ButtonCard} from "../../components/ButtonCard/ButtonCard.tsx";
import classes from "./MenuView.module.css"
import {goToQuestionnaires} from "../../questionnaire/questionnairesSaga.ts";
import {Footer} from "../../components/Footer/Footer.tsx";
import {goToDocumentsView} from "../../document/documentSaga.ts";
import {FormType, getHasForms} from "../../forms/formSlice.ts";
import {Link} from "../../components/Link/Link.tsx";
import {useSelector} from "react-redux";

export const MenuView = () => {
    const hasForms = useSelector(getHasForms);

    return (
        <>
            <AppBar/>

            <div className={classes.content}>
                <div className={classes.section}>
                    <h1>Local Convention Dashboard</h1>
                    <ButtonCard label="Resolutions and Amendments" action={goToDocumentsView()}/>
                    <ButtonCard label="Questionnaires" action={goToQuestionnaires()}/>
                </div>

                <div className={classes.section}>
                    <ButtonCard label="Submit an Amendment" action={goToFormViewAction(FormType.AMENDMENT)}/>
                    {hasForms &&
                        <ButtonCard label="View Your Form Submissions"
                                    action={goToFormsViewAction()}/>
                    }
                    <p>
                        <Link url="https://link.stldsa.org/convention_standing_rules">
                            Standing Rules of the 2025 St. Louis DSA Local Convention
                        </Link>
                    </p>
                </div>
            </div>

            <Footer/>
        </>
    )
}