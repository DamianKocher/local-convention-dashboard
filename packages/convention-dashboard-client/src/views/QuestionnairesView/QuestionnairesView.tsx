import {AppBar} from "../../components/AppBar/AppBar.tsx";
import {goToMenu} from "../../app/appSaga.ts";
import {useSelector} from "react-redux";
import {getQuestionnaires} from "../../questionnaire/questionnaireSlice.ts";
import {QuestionnaireCard} from "../../components/QuestionnaireCard/QuestionnaireCard.tsx";
import classes from "./QuestionnairesView.module.css";
import {Footer} from "../../components/Footer/Footer.tsx";

export const QuestionnairesView = () => {
    const questionnaires = useSelector(getQuestionnaires);

    return (
        <>
            <AppBar backAction={goToMenu}/>

            <div className={classes.wrapper}>
                <h1>Executive Committee & Formation Officer Questionnaires</h1>

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
                                <p
                                    key={questionnaire.id}
                                    className={classes.tocEntry}
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
                        <QuestionnaireCard key={questionnaire.id} questionnaire={questionnaire}/>
                    )}
                </div>
            </div>

            <Footer/>
        </>
    )
}