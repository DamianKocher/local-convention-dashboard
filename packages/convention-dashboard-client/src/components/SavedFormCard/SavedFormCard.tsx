import classes from "./SavedFormCard.module.css";
import {useDispatch} from "react-redux";
import {deleteFormAction} from "../../forms/formsSaga.ts";

type Props = {
    id: number;
    type: string;
    link: string;
}

export const SavedFormCard = ({id, type, link}: Props) => {
    const dispatch = useDispatch();

    function deleteForm() {
        dispatch(deleteFormAction(id));
    }

    return (
        <div className={classes.form}>
            <p>{type}</p>

            <p className={classes.delete} onClick={deleteForm}>Delete</p>

            <p><a href={link} target="_blank">{link}</a></p>
        </div>
    )
}