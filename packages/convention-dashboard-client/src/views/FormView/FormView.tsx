import {AppBar} from "../../components/AppBar/AppBar.tsx";
import {Footer} from "../../components/Footer/Footer.tsx";
import {useAppSelector} from "../../store/store.ts";
import {getFormLink, getSelectedFormType, setFormLink} from "../../forms/formSlice.ts";
import {Input} from "../../components/Input/Input.tsx";
import {Button} from "../../components/Button/Button.tsx";
import {submitFormAction} from "../../forms/formsSaga.ts";

import classes from "./FormView.module.css";
import {goToMenu} from "../../app/appSaga.ts";

const FUCKED_UP_URL_REGEX = new RegExp('https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)');

export const FormView = () => {
    const formType = useAppSelector(getSelectedFormType);

    const link = useAppSelector(getFormLink);
    const isLinkValid = FUCKED_UP_URL_REGEX.test(link);

    return (
        <>
            <AppBar backAction={goToMenu}/>

            <div className={classes.form}>
                <h1>Submit an {formType}</h1>

                <Input label="Document Link" onChange={setFormLink} type="url" autocomplete="url"/>

                <Button label="Submit" disabled={!isLinkValid} onClick={submitFormAction}/>
            </div>

            <Footer/>
        </>
    );
}