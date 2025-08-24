import classes from "./SavedFormCard.module.css";
import {useDispatch} from "react-redux";
import {deleteFormAction} from "../../forms/formsSaga.ts";
import {Link} from "../Link/Link.tsx";

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
            <h3>{type}</h3>

            <p className={classes.delete} onClick={deleteForm}>Delete</p>

            <Link url={link}>{link}</Link>
        </div>
    )
}