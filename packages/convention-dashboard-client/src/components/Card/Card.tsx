import classes from "./Card.module.css";
import type {ActionCreatorWithoutPayload} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";

type Props = {
    label: string;
    onClick: ActionCreatorWithoutPayload;
}

export const Card = ({label, onClick}: Props) => {
    const dispatch = useDispatch();

    function handleClick() {
        dispatch(onClick());
    }

    return (
        <div className={classes.card} onClick={handleClick}>
            <p className={classes.label}>{label}</p>
        </div>
    )
}