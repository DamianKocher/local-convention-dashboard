import classes from './Button.module.css';
import type {ActionCreatorWithoutPayload} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";

type Props = {
    label: string;
    disabled: boolean;
    onClick: ActionCreatorWithoutPayload
}

export const Button = ({label, disabled, onClick}: Props) => {
    const dispatch = useDispatch();

    function handleClick() {
        dispatch(onClick());
    }

    return (
        <button
            className={classes.button}
            disabled={disabled}
            onClick={handleClick}
        >
            {label}
        </button>
    )
};