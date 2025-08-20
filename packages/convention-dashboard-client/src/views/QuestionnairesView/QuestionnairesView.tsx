import {AppBar} from "../../components/AppBar/AppBar.tsx";
import {goToMenu} from "../../app/appSaga.ts";
import {useSelector} from "react-redux";
import {getQuestionnaires} from "../../questionnaire/questionnaireSlice.ts";
import {QuestionnaireCard} from "../../components/QuestionnaireCard/QuestionnaireCard.tsx";
import classes from "./QuestionnairesView.module.css";

export const QuestionnairesView = () => {
    const questionnaires = useSelector(getQuestionnaires);

    return (
        <>
            <AppBar backAction={goToMenu}/>

            <div className={classes.wrapper}>
                <p className={classes.label}>2025-2026 STL DSA Formation Officer Questionnaires</p>

                <div>
                    <p className={classes.sublabel}>Table of Content</p>
                    {questionnaires.map((questionnaire) => {
                            function onClick() {
                                const element = document.getElementById(`questionnaire-${questionnaire.id}`);
                                if (element) {
                                    element.scrollIntoView({behavior: "smooth"});
                                }
                            }

                            return (
                                <p className={classes.tocEntry}
                                   onClick={onClick}
                                >
                                    {questionnaire.formation} • {questionnaire.name} ({questionnaire.pronouns})
                                </p>
                            )
                        }
                    )}
                </div>


                <div className={classes.questionnaires}>
                    {questionnaires.map((questionnaire) =>
                        <QuestionnaireCard questionnaire={questionnaire}/>
                    )}
                </div>
            </div>
        </>
    )
}