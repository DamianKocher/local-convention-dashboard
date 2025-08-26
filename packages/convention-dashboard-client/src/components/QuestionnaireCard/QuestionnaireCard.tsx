import type {Questionnaire} from "convention-dashboard-shared/src";
import classes from "./QuestionnaireCard.module.css";

type Props = {
    questionnaire: Questionnaire
}

export const QuestionnaireCard = ({questionnaire}: Props) => {
    return (
        <div className={classes.wrapper} id={`questionnaire-${questionnaire.id}`}>
            <div className={classes.card}>
                <div>
                    <h2>{questionnaire.name}</h2>
                    <p>{questionnaire.pronouns}</p>
                    <p>
                        <span className={classes.field}>Membership Start: </span>
                        <span>{questionnaire.startDate}</span>
                    </p>

                    <p>
                        <span className={classes.field}>Role you are running for: </span>
                        <span>{questionnaire.formation}</span>
                    </p>
                </div>

                <div className={classes.responses}>{questionnaire.data.map(({label, value}, i) => {
                    return (
                        <div key={i}>
                            <p className={classes.label}>{label}</p>
                            <p>{value}</p>
                        </div>
                    )
                })}</div>
            </div>
        </div>
    )
}