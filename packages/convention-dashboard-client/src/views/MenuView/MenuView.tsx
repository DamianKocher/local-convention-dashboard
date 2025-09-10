import {AppBar} from "../../components/AppBar/AppBar.tsx";
import {ButtonCard} from "../../components/ButtonCard/ButtonCard.tsx";
import classes from "./MenuView.module.css"
import {goToQuestionnaires} from "../../questionnaire/questionnairesSaga.ts";
import {Footer} from "../../components/Footer/Footer.tsx";
import {goToDocumentsView} from "../../document/documentSaga.ts";
import {Link} from "../../components/Link/Link.tsx";

export const MenuView = () => {
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