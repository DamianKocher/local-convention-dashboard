import {AppBar} from "../../components/AppBar/AppBar.tsx";
import {Footer} from "../../components/Footer/Footer.tsx";
import classes from "./FormsView.module.css";
import {getForms} from "../../forms/formSlice.ts";
import {useSelector} from "react-redux";
import {SavedFormCard} from "../../components/SavedFormCard/SavedFormCard.tsx";
import {goToMenu} from "../../app/appSaga.ts";

export const FormsView = () => {
    const forms = useSelector(getForms);

    return (
        <>
            <AppBar backAction={goToMenu}/>

            <div className={classes.forms}>
                <h1>Form Submissions</h1>
                {forms.length === 0 && <p>No forms submitted.</p>}
                {forms.map((form) => <SavedFormCard key={form.id} id={form.id} type={form.type} link={form.link}/>)}
            </div>

            <Footer/>
        </>
    );
}