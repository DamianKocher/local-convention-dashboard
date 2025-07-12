import classes from "./input.module.css";
import type {ChangeEvent, HTMLInputTypeAttribute} from "react";
import type {ActionCreatorWithPayload} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";

type Props = {
    label: string;
    type?: HTMLInputTypeAttribute;
    autocomplete: HTMLInputTypeAttribute;
    placeholder?: string;
    maxLength?: number;
    onChange: ActionCreatorWithPayload<string>;
}

export const Input = ({label, onChange, placeholder, maxLength, type, autocomplete}: Props) => {
    const dispatch = useDispatch();

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const action = onChange(event.target.value);
        dispatch(action);
    }

    return (
        <div className={classes.container}>
            <p className={classes.label}>{label}</p>
            <input
                name={label}
                autoComplete={autocomplete}
                className={classes.input}
                onChange={handleChange}
                placeholder={placeholder}
                maxLength={maxLength}
                type={type}
            />
        </div>
    );
}