import classes from "./FormCard.module.css";
import type {FormType} from "../../forms/formSlice.ts";
import {useDispatch} from "react-redux";
import {goToFormViewAction} from "../../forms/formsSaga.ts";

type Props = {
    formType: FormType;
}

export const FormCard = ({formType}: Props) => {
    const dispatch = useDispatch();

    function onClick() {
        dispatch(goToFormViewAction(formType));
    }

    return (
        <div className={classes.container} onClick={onClick}>
            <p>{formType}</p>
        </div>
    );
};