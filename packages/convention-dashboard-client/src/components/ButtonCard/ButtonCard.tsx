import classes from "./ButtonCard.module.css";
import type {Action} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";

type Props = {
    label: string;
    action: Action;
}

export const ButtonCard = ({label, action}: Props) => {
    const dispatch = useDispatch();

    function handleClick() {
        dispatch(action);
    }

    return (
        <div className={classes.card} onClick={handleClick}>
            <p className={classes.label}>{label}</p>
        </div>
    )
}