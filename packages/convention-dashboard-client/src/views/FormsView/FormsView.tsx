import {AppBar} from "../../components/AppBar/AppBar.tsx";
import {Footer} from "../../components/Footer/Footer.tsx";
import classes from "./FormsView.module.css";
import {FormCard} from "../../components/FormCard/FormCard.tsx";
import {FormType, getForms} from "../../forms/formSlice.ts";
import {useSelector} from "react-redux";
import {SavedFormCard} from "../../components/SavedFormCard/SavedFormCard.tsx";
import {goToMenu} from "../../app/appSaga.ts";

export const FormsView = () => {
    const forms = useSelector(getForms);

    return (
        <>
            <AppBar backAction={goToMenu}/>

            <div className={classes.header}>
                <h1></h1>
            </div>

            <div className={classes.header}>
                <h1>Submit a questionnaire or resolution:</h1>

                <FormCard formType={FormType.EC}/>
                <FormCard formType={FormType.FORMATION}/>
                <FormCard formType={FormType.RESOLUTION}/>
            </div>

            {forms.length > 0 && (
                <div className={classes.forms}>
                    <h1>Submitted:</h1>
                    {forms.map((form) => <SavedFormCard key={form.id} id={form.id} type={form.type} link={form.link}/>)}
                </div>
            )}


            <Footer/>
        </>
    );
}