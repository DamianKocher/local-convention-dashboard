import {AppBar} from "../../components/AppBar/AppBar.tsx";
import {Footer} from "../../components/Footer/Footer.tsx";
import {useAppSelector} from "../../store/store.ts";
import {FormType, getFormLink, getSelectedFormType, setFormLink} from "../../forms/formSlice.ts";
import {Input} from "../../components/Input/Input.tsx";
import {Button} from "../../components/Button/Button.tsx";
import {submitFormAction} from "../../forms/formsSaga.ts";

import classes from "./FormView.module.css";
import {goToMenu} from "../../app/appSaga.ts";
import {Link} from "../../components/Link/Link.tsx";

const FUCKED_UP_URL_REGEX = new RegExp('https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)');

export const FormView = () => {
    const formType = useAppSelector(getSelectedFormType);

    const link = useAppSelector(getFormLink);
    const isLinkValid = FUCKED_UP_URL_REGEX.test(link);

    return (
        <>
            <AppBar backAction={goToMenu}/>

            <div className={classes.form}>
                <h1>{formType}</h1>

                {formType != FormType.RESOLUTION && (
                    <>
                        <p>Please make a copy of the questionnaire linked below. Fill it out and submit the new link to
                            your
                            questionnaire in the field below. Make sure to set the document to sharing permissions to
                            "View". If
                            you have any questions or concerns, please reach out to the EC at
                            saintlouisdsa@gmail.com.</p>

                        <p>
                            {formType === FormType.EC &&
                                <Link url="https://link.stldsa.org/ec_questionnaire">EC Questionnaire</Link>}
                            {formType === FormType.FORMATION &&
                                <Link url="https://link.stldsa.org/formation_leader_questionnaire">Formation
                                    Officer Questionnaire</Link>}
                        </p>


                        <p><Link url="https://link.stldsa.org/2025-convention-nomination-form">Submit Your Officer
                            Self-Nomination Form</Link></p>
                    </>
                )}

                {formType === FormType.RESOLUTION && (
                    <p>
                        Please submit a link to your resolution in the field below. Set the document permissions to
                        “Commenter” so that members can endorse the resolution by adding their name as a co-signer. See
                        the <a href="https://link.stldsa.org/resolution_guide" target="_blank">“How to Write a
                        Resolution”</a> guide to learn how a resolution should be structured and
                        formatted. More example resolutions can be found <a href="https://stldsa.org/resolutions/"
                                                                            target="_blank">here</a>.
                    </p>
                )}

                <Input label="Document Link" onChange={setFormLink} type="url" autocomplete="url"/>

                <Button label="Submit" disabled={!isLinkValid} onClick={submitFormAction}/>
            </div>

            <Footer/>
        </>
    );
}